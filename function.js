// const upload = require('./multer');
// const testingEmailTemplate = require('./template');
// const multer = require('multer');
// // const fs = require('fs'); // Import fs.promises
// // const fetch = require('node-fetch');
// const currentPath = process.cwd();
// const path = require('path')
// const emailUrl = process.env.EMAIL_URL;
// const emailAttachment = process.env.Email_URL_Attachments
// const emailToken = process.env.EMAIL_TOKEN;
// const FormData = require('form-data');


// async function templateData(emailData) {
//     const fetch = await import('node-fetch').then(module => module.default);
//     const { receiverName, receiverEmail, subjectEmail } = emailData;
//     const emailText = testingEmailTemplate(emailData);
//     const body = JSON.ify({
//         "to": emailData.receiverEmail,
//         "from": emailData.senderEmail,
//         "subject": emailData.subjectEmail,
//         "text": emailText,
//         "cc": emailData.cc
//     });

//     const response = await fetch(`${emailUrl}`, {
//         method: 'post',
//         body: body,
//         headers: {
//             'Authorization': 'Bearer ' + emailToken,  // Corrected header name
//             'Content-Type': 'application/json'
//         }
//     });

//     const status = response.status;
//     const responseBody = await response.text();

//     if (!response.ok) {
//         throw new Error(`Email sending failed with status: ${status}, response: ${responseBody}`);
//     }

//     return responseBody;
// }

// async function templateDataAttachment(emailData,) {
//     try {
//         const emailText = testingEmailTemplate(emailData);
//         //console.log('emailtest==> ', emailText);

//         const formData = new FormData();
//         formData.append('to', emailData.receiverEmail);
//         formData.append('from', emailData.senderEmail);
//         formData.append('subject', emailData.subjectEmail);
//         formData.append('text', emailText);
//         for (const file of emailData.attachment) {
//             const fileStream = fs.createReadStream(file.path); // Create a readable stream for the file
//             formData.append('files', fileStream, { filename: file.filename });
//         }

//         // Prepare Axios request config
//         const config = {
//             method: 'post',
//             url: 'https://communication.edulab.in/api/v2/Email/sendgrid/emailWithAttachment/text-html', // Replace with your email API endpoint
//             headers: {
//                 'accept': '*/*',
//                 'Authorization': 'Bearer ' + emailToken,  // Replace with your API token

//             },
//             maxContentLength: Infinity,
//             maxBodyLength: Infinity,
//             data: formData
//             // data: {
//             //     to: emailData.receiverEmail,
//             //     from: emailData.senderEmail,
//             //     subject: emailData.subjectEmail,
//             //     text: emailText
//             // }

//         };
//         const response = await axios(config);

//         if (!response || response.status !== 200) {
//             throw new Error('Failed to send email.');
//         }

//         console.log('Email sent successfully.');
//         return response.data;
//     } catch (error) {
//         console.error('Error sending email:', error.message);
//         throw error; // Rethrow the error for the caller to handle
//     }
// }

// module.exports = templateData;
// module.exports = templateDataAttachment

const sgMail = require('@sendgrid/mail');

const sendGridEmail = async (
    email,
    html,
    subject,
    attachmentData = null,
    cc = null,
    bcc = null
) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // Construct the email object
    const emailData = {
        to: email,
        from: 'manish@edulab.in', // Replace with your verified sender email
        subject: subject,
        html: html,
    };

    // Attach cc and bcc if they are provided
    if (cc) {
        emailData.cc = cc;
    }

    if (bcc) {
        emailData.bcc = bcc;
    }

    // Attach files if provided
    if (attachmentData) {
        emailData.attachments = [{
            filename: attachmentData.filename,
            content: attachmentData.content,
            type: attachmentData.type,
            disposition: 'attachment',
        }]
    }

    try {
        await sgMail.send(emailData);
        console.log('Email sent successfully to', email);
    } catch (error) {
        console.error('Error sending email for', error.response.body);
    }
};

module.exports = sendGridEmail 