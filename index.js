const express = require('express');
const { message } = require('statuses');
const router = express.Router();
const xlsx = require('xlsx');
const currentPath = process.cwd();
const testingEmailTemplate = require('./template');
const multer = require('multer');
// const fetch = require('node-fetch');

const emailUrl = process.env.EMAIL_URL;
const emailToken = process.env.EMAIL_TOKEN;



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(`${currentPath}/public/emails`)) {
            fs.mkdirSync(`${currentPath}/public/emails`);
        }
        cb(null, `${currentPath}/public/emails`);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        cb(null, originalName);
    },
});

const upload = multer({ storage });



async function templateData(emailData) {
    const fetch = await import('node-fetch').then(module => module.default);
    const { receiverName, receiverEmail, subjectEmail } = emailData;
    const emailText = testingEmailTemplate(emailData);
    const body = JSON.stringify({
        "to": emailData.receiverEmail,
        "from": emailData.senderEmail,
        "subject": emailData.subjectEmail,
        "text": emailText
    });

    const response = await fetch(`${emailUrl}`, {
        method: 'post',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + emailToken,  // Corrected header name
            'Content-Type': 'application/json'
        }
    });

    const status = response.status;
    const responseBody = await response.text();

    if (!response.ok) {
        throw new Error(`Email sending failed with status: ${status}, response: ${responseBody}`);
    }

    return responseBody;
}



router.post('/uploadEmailExcel', async (req, res) => {
    try {
        // Ensure that a file was uploaded
        if (!req.files) {
            throw new Error('No file uploaded.');
        }
        if (req.files) {
            const file = req.files;
            const datafile = file?.file;
            const data = new Uint8Array(datafile.data);
            const workbook = xlsx.read(data, {
                type: "buffer",
                cellDates: true,
                cellNF: false,
                cellText: false
            });
            const sheet_name_list = workbook.SheetNames;
            const xlsxData = xlsx.utils.sheet_to_json(
                workbook.Sheets[sheet_name_list[0]],
                { raw: false }
            );
            let emailCount = 0;

            // Extract email IDs and send emails
            for (const data of xlsxData) {
                const { College, Course, email } = data;
                //const email = row.email; // Adjust this based on your Excel column name

                const emailData = {
                    receiverName: 'Applicant', // Update with actual receiver name
                    receiverEmail: email, // Update with actual receiver email
                    subjectEmail: 'HSNC University - Selection under Merit List',
                    senderEmail: 'hsnc@admissiondesk.org', // Assuming req.user contains user information
                    College: College,
                    Course: Course
                }
                await templateData(emailData);
                emailCount++
            }
            res.json({ message: 'Emails sent successfully!', count: emailCount });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }

})




module.exports = router;