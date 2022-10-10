const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports.sendMailWithGmail = async (data) => {
   try{
    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SENDER_MAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
 
    const mailData = {
      from: process.env.SENDER_MAIL, // sender address
      to: data.to, // list of receivers
      subject: data.subject,
      text: data.text,
      html: `<b>Hey there! </b><h1 style="color:"red">this is good practice ${data.text}</h1><button>confirm mail</button>
         <br> This is our first message sent with Nodemailer<br/>`,
    };
    // console.log(mailData);
    let info = await transporter.sendMail(mailData);
 
    // console.log("Message sent: %s", info.messageId);
 
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //      console.log(info);
    return info.messageId;
   }
   catch(error){
        console.log(error)
   }
};


// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
// 	username: 'api',
// 	key: process.env.MAILGUN_KEY,
// });
// // logs any error`;

// module.exports.sendMailWithGun = async (data) => {

// 	try {
// 		const result = await mg.messages
// 			.create("sandbox8eae0b3218a24ae98dbc297659ad7116.mailgun.org", {
// 				from: "Mailgun Sandbox <postmaster@sandbox8eae0b3218a24ae98dbc297659ad7116.mailgun.org>",
// 				to: data.to,
// 				subject: data.subject,
// 				text: data.text
// 			})
// 		.then(msg => console.log(msg)) // logs response data
// 		.catch(err => console.log(err));
// 		// console.log(result);
// 		return result.id;
// 	}
// 	catch (error) {
//            console.log(error.message)
// 	}
// }
// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.