function testingEmailTemplate(emailData) {
    const emailContext = `<!DOCTYPE html>
    <html>
    <head>
        <title>Merit List Notification</title>
        <style>
            .center {
                display: block;
                margin-left: auto;
                margin-right: auto;
                max-width: 100%; /* Ensure the image is responsive */
                height: auto;
            }
        </style>
    </head>
    <body>
         <img src="https://hsncu.studentscenter.in/hsnc.png" alt="HSNC University" class="center">
        <p>Dear Applicant</p>
        <p>Your name has been selected for the merit list of ${emailData.College} for the ${emailData.Course} program.</p>
        <p>You are required to login to the HSNCU AdmissionDesk portal & upload the remaining documents. Once the documents are uploaded you can submit the selected course for verification.</p>
        <p><strong>What's Next?</strong><br>
        If all the documents are proper, you will receive the payment link for payment of the course fees.<br>
        If all the documents are not proper, you will receive another email to upload the proper documents.</p>
        <p>For any further assistance, feel free to contact us.</p>
        <p>Regards,</p>
        <p>Admissions Team<br>
        HSNC University, Mumbai</p>
    </body>
    </html>
    `;
    return emailContext;
}

module.exports = testingEmailTemplate;