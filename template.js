function testingEmailTemplate(emailData) {
  const emailContext =
 `<!DOCTYPE html>
<html>
<head>
    <title>On-Screen Checking Allocation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header img {
            display: block;
            margin: 0 auto 20px;
            max-width: 150px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://suattestation.studentscenter.in/api/upload/profile_pic/sulogo.png" alt="Solapur University Logo">
        </div>
        <div class="content">
            <p>Dear Sir/Ma'am,</p>
            <p>You have been allocated the following subject for on-screen checking:</p>
            <p><strong>Subject Name:</strong> ${emailData.subjectName}<br>
               <strong>Course:</strong> ${emailData.courseName} <br>
               <strong>Semester:</strong> ${emailData.semName} <br>
               <strong>Exam Year:</strong> ${emailData.examYear}<br>
               <strong>Exam Month:</strong> ${emailData.examMonth}</p>
            <p>Please complete the checking through the following link:</p>
            <p><a href="pahsu.paperevaluation.com" target="_blank">pahsu.paperevaluation.com</a></p>
            <p><strong>Deadline:</strong> ${emailData.evaluationDeadline} </p>
            <p>Kindly ensure the allocated task is completed within the given timeline. If you have any questions, issues, or concerns, please contact us:<br>
            <strong>Phone:</strong> <a href="tel:+919152252162">+91 9152252162</a><br>
            <strong>Email:</strong> <a href="mailto:osm@edulab.in">osm@edulab.in</a></p>
            <p>Thank you,<br>Examination Department</p>
        </div>
    </div>
</body>
</html>
`;

  return emailContext;
}

// function templateDataAttachment(emailData, fileBuffers) {
//   const emailTemplate = ` <!DOCTYPE html>
//                             <html>
//                             <head>
//                             </head>
//                             <body>
//                             <img src="https://hsncu.studentscenter.in/hsnc.png" alt="HSNC University" style="display: block; margin-left: auto; margin-right: auto; width: 150px;">
//                             <p>Dear Students,</p><br><br><br>
//      <p>Regards,<br>
//         Admissions Team<br>
//         HSNC University, Mumbai</p>
//             </body>
//             </html>`;
//   return emailTemplate;`
// }


module.exports = testingEmailTemplate;
//module.exports = templateDataAttachment;


