function testingEmailTemplate(emailData) {
  const emailContext =  `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paper Checking Instructions</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 20px;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            background-color: #fff;
        }
        .email-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .email-header img {
            max-width: 100px;
            height: auto;
        }
        .email-body {
            margin-bottom: 20px;
        }
        .email-footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
        ol {
            padding-left: 20px;
        }
        ol li {
            margin-bottom: 10px;
        }
        .highlight {
            font-weight: bold;
            color: #e74c3c;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://suattestation.studentscenter.in/api/upload/profile_pic/sulogo.png" alt="Solapur University Logo">
        </div>

        <h1>Paper Checking Instructions</h1>
        <p>
            Kindly refer to the above video to check the papers.<br>
            <strong>कागदपत्रे तपासण्यासाठी कृपया वरील व्हिडिओ पहा</strong>
        </p>

        <h2>Please follow the below tips and instructions for a hassle-free experience</h2>
        <p>
            <strong>त्रासमुक्त अनुभवासाठी कृपया खालील टिपा आणि सूचनांचे अनुसरण करा</strong>
        </p>

        <div class="email-body">
            <ol>
                <li>
                    Kindly ensure that you have a good internet connection/speed because if the internet connection is bad, the paper will not load/open.<br>
                    <strong>कृपया तुमच्याकडे चांगले इंटरनेट कनेक्शन/स्पीड असल्याची खात्री करा कारण इंटरनेट कनेक्शन खराब असल्यास, पेपर लोड/उघडणार नाही.</strong>
                </li>
                <li>
                    For the question paper, click on the capital Q as shown in the video.<br>
                    <strong>प्रश्नपत्रिकेसाठी, व्हिडिओमध्ये दाखवल्याप्रमाणे कॅपिटल Q वर क्लिक करा.</strong>
                </li>
                <li>
                    For entering marks, you have to click on the number and then click on the answer sheet.<br>
                    <strong>किंवा गुण प्रविष्ट करताना, तुम्ही क्रमांकावर क्लिक करा आणि नंतर उत्तरपत्रिकेवर क्लिक करा.</strong>
                </li>
                <li>
                    For example, if you want to give 20 marks, you have to click on 10 twice and click on the answer paper.<br>
                    <strong>उदाहरणार्थ, जर तुम्हाला 20 गुण द्यायचे असतील तर तुम्हाला 10 वर दोनदा क्लिक करावे लागेल आणि उत्तरपत्रिकेवर क्लिक करावे लागेल.</strong>
                </li>
                <li>
                    Also, make sure that all pages have annotations or you will not be able to submit the paper.<br>
                    <strong>तसेच, सर्व पृष्ठांवर भाष्ये आहेत किंवा तुम्ही पेपर सबमिट करू शकणार नाही याची खात्री करा.</strong>
                </li>
                <li>
                    <span class="highlight">Kindly reject the paper only if you are unable to read the answer at all.</span><br>
                    <strong>जर तुम्हाला उत्तर अजिबात वाचता येत नसेल तरच कृपया पेपर नाकारावा</strong>
                </li>
                <li>
                    After you have completed checking all papers for any subject, you have to click on ‘Submit Assessment’.<br>
                    <strong>तुम्ही कोणत्याही विषयाचे सर्व पेपर तपासल्यानंतर, तुम्हाला 'Submit Assessment' वर क्लिक करावे लागेल.</strong>
                </li>
                <li>
                    If you have stopped paper checking for any reason, you can start from that paper again, and the status will be shown as ‘Pending’ as shown in the video.<br>
                    <strong>जर तुम्ही कोणत्याही कारणास्तव पेपर तपासणे थांबवले असेल तर तुम्ही पुन्हा त्या पेपरपासून सुरुवात करू शकता आणि व्हिडिओमध्ये दाखवल्याप्रमाणे स्टेटस ‘पेंडिंग’ म्हणून दाखवले जाईल.</strong>
                </li>
                <li>
                    Once you click on ‘Submit Assessment’, it will not allow you to go back and check.<br>
                    <strong>एकदा तुम्ही 'असेसमेंट सबमिट करा' वर क्लिक केल्यानंतर, ते तुम्हाला परत आणि तपासण्याची परवानगी देणार नाही.</strong>
                </li>
            </ol>
        </div>

        <div class="email-footer">
            <p><br>
            Best regards,<br>
            Examination Department
            </p>
        </div>
    </div>
</body>
</html>

  `
;
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


