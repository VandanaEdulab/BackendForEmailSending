const express = require('express');
const sendGridEmail = require('./function')
const { message } = require('statuses');
const router = express.Router();
const xlsx = require('xlsx');
const upload = require('./multer');
const testingEmailTemplate = require('./template');
const multer = require('multer');
// const fs = require('fs'); // Import fs.promises
// const fetch = require('node-fetch');
const currentPath = process.cwd();
const path = require('path')
const emailUrl = process.env.EMAIL_URL_Text;
const emailAttachment = process.env.Email_URL_Attachments
const emailToken = process.env.EMAIL_TOKEN;
const FormData = require('form-data');
const moment = require('moment');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const axios = require('axios');
const { CLIENT_RENEG_LIMIT } = require('tls');
// const { console } = require('inspector');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB
}));


// Your existing routes and middleware

async function templateData(emailData) {
    const fetch = await import('node-fetch').then(module => module.default);
    const { subjectName, courseName, semName, examMonth, examYear, evaluationDeadline } = emailData;

    const emailText = testingEmailTemplate(emailData);
    const body = JSON.stringify({
        "to": emailData.receiverEmail,
        "from": emailData.senderEmail,
        "subject": emailData.subjectEmail,
        "text": emailText,
       // "cc": emailData.cc,

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
            const datafile = file?.files;
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
             const { email, subjectName, courseName,semName,examMonth,examYear,evaluationDeadline} = data;

              // const {email ,firstName } = data;



 let formattedDate = moment(evaluationDeadline, 'MM/DD/YYYY').format('DD-MM-YYYY', 'MM/DD/YYYY');
//      console.log('step-1', formattedDate)

                const emailData = {
                    receiverName: 'Student', // Update with actual receiver name
                    receiverEmail: email, // Update with actual receiver email
                    subjectEmail: 'Reminder: On-Screen Checking Allocation',
                    senderEmail: 'osm@edulab.in', // Assuming req.user contains user information
                    subjectName: subjectName,
                    courseName : courseName,
                    semName:semName,
                    examMonth:examMonth,
                    examYear:examYear,
                    evaluationDeadline:formattedDate

                    //evaluationDeadline: `moment(${evaluationDeadline}).format('YYYY-MM-DD')`
                }


                // const emailData={
                //     receiverName: 'Student', // Update with actual receiver name
                //     receiverEmail: email, // Update with actual receiver email
                //     subjectEmail: 'P.A.H.S.U:Login Credentials for OSM Tool',
                //     senderEmail: 'osm@edulab.in', // Assuming req.user contains user information
                //     firstName: firstName,
                //     userName: email

                // }
                console.log("email_Ids",emailData.receiverEmail,emailData.subjectName,emailData.courseName,emailData.semName,emailData.examMonth,emailData.examYear,emailData.evaluationDeadline)
                //       const emailData = {
                //     receiverName: 'Student', // Update with actual receiver name
                //     receiverEmail: email, // Update with actual receiver email
                //     subjectEmail: 'Important: HSNC University - Please Fill Out the Google Form with Your APAAR / ABC ID',
                //     senderEmail: 'noreply@studentscenter.in', // Assuming req.user contains user information
                //     studentName: studentName

                // }
                //console.log("emailData",emailData.receiverEmail,emailData.studentName)
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


async function templateDataAttachment(emailData,) {
    try {
        const emailText = testingEmailTemplate(emailData);

        const formData = new FormData();
        formData.append('to', emailData.receiverEmail);
        formData.append('from', emailData.senderEmail);
        formData.append('subject', emailData.subjectEmail);
        formData.append('text', emailText);
        for (const file of emailData.attachment) {
            formData.append('files', Buffer.from(file.content, 'base64'), file.filename);
        }


        // Prepare Axios request config
        const config = {
            method: 'post',
            url: 'https://communication.edulab.in/api/v2/Email/sendgrid/emailWithAttachment/text-html', // Replace with your email API endpoint
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + emailToken,  // Replace with your API token

            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            data: formData
            // data: {
            //     to: emailData.receiverEmail,
            //     from: emailData.senderEmail,
            //     subject: emailData.subjectEmail,
            //     text: emailText
            // }

        };
        const response = await axios(config);

        if (!response || response.status !== 200) {
            throw new Error('Failed to send email.');
        }

        console.log('Email sent successfully.');
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error; // Rethrow the error for the caller to handle
    }
}


router.post('/uploadEmailWithAttachments', async (req, res) => {
    try {
        // Ensure that a file was uploaded
        if (!req.files) {
            throw new Error('No file uploaded.');
        }


        const file = req.files;
        const datafile = file?.files;
        const data = new Uint8Array(datafile.data);
        const workbook = xlsx.read(data, {
            type: 'buffer',
            cellDates: true,
            cellNF: false,
            cellText: false
        });
        const sheetNameList = workbook.SheetNames;
        const xlsxData = xlsx.utils.sheet_to_json(
            workbook.Sheets[sheetNameList[0]],
            { raw: false }
        );

        let emailCount = 0;

        // Extract email IDs and send emails
        for (const entry of xlsxData) {
            const { email, studentName } = entry;
            console.log("email",email);

            // if (!email) {
            //     console.warn('Skipping entry with missing email:', entry);
            //     continue;
            // }

            const emailData = {
                receiverName: studentName || 'Student',
                receiverEmail: email,
                subjectEmail: 'PAHSU - Reminder to check assigned papers on OSM',
                senderEmail: 'osm@edulab.in',
                studentName
            };

            const attachmentPath = path.resolve(__dirname, 'upload', 'OSM_VIDEO.mp4'); // Replace with your actual file path

            const attachment = fs.readFileSync(attachmentPath).toString('base64');


            const emailPayload = {
                ...emailData,
                attachment: [
                    {
                        content: attachment,
                        filename: 'EducationalVideo.mp4',
                        type: 'video/mp4',
                        disposition: 'attachment'
                    }
                ]
            };


            await templateDataAttachment(emailPayload);
            emailCount++;
        }

        res.json({ message: 'Emails sent successfully with attachments!', count: emailCount });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});
// router.post('/uploadEmailWithAttachments', async (req, res) => {
//     try {
//         // if (!req.files || !req.files.file) {
//         //     throw new Error('No file uploaded.');
//         // }
//         console.log('Uploading', req.files)
//         const datafile = req.files;
//         const data = new Uint8Array(datafile.data);
//         const workbook = xlsx.read(data, {
//             type: "buffer",
//             cellDates: true,
//             cellNF: false,
//             cellText: false
//         });
//         const sheet_name_list = workbook.SheetNames;
//         const xlsxData = xlsx.utils.sheet_to_json(
//             workbook.Sheets[sheet_name_list[0]],
//             { raw: false }
//         );

//         const filePath1 = path.join(`${process.cwd()}`, 'upload', 'PET_9_AdmissionProcess_afterPET_Exam.pdf');
//         // const filePath2 = path.join('D:/BackendForEmail/', 'upload', 'Ph.D instructions (English).pdf');

//         const fileContent = fs.readFileSync(filePath1);

//         // Convert to base64
//         const bufferExcel = fileContent.toString('base64');
//         let emailCount = 0;

//         // Iterate over each data entry in xlsxData
//         await Promise.all(xlsxData.map(async (data, index) => {
//             const { email } = data;

//             console.log("email",email)

//             sendGridEmail(email,
//                 '<h1>Hello vandana</h1>',
//                 'Testing',
//                 {
//                     filename: 'PET_9_AdmissionProcess_afterPET_Exam.pdf', // updated filename and extension
//                     content: bufferExcel,
//                     type: 'application/pdf', // correct MIME type for Excel files
//                 },
//             )
//             emailCount += index;
//         }))



//         res.json({ message: 'Emails sent successfully!', count: emailCount });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// });



module.exports = router;