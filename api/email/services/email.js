const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;


// const createTransporter = async () => {
//     const oauth2Client = new OAuth2(
//         //-- voorlopig hard coded testen 
//         // process.env.CLIENT_ID,
//         // process.env.CLIENT_SECRET,
//         '898836579607-qofdigbih7vfk0b4f6rirg28nhi5srtv.apps.googleusercontent.com',
//         'LiBBdVdJSD5Bu8F16vdY_p10',
//         "https://developers.google.com/oauthplayground"
//     );
  
//     oauth2Client.setCredentials({
//       //refresh_token: process.env.REFRESH_TOKEN
//       refresh_token: '1//04ZyT5YmXJnv6CgYIARAAGAQSNwF-L9Ir0-w_2B3cDyGxzk0Xx9Cj83FiXGtbKxE2KN2w1dGIvnBbfVAmxMUBz-f3WTD52zazELU'
//     });

//     const accessToken = await new Promise((resolve, reject) => {
//         oauth2Client.getAccessToken((err, token) => {
//           if (err) {
//             reject();
//           }
//           resolve(token);
//         });
//     });
    
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           type: "OAuth2",
//           user: 'bisouterie.amelie@gmail.com',
//           accessToken,
//           clientId: '898836579607-qofdigbih7vfk0b4f6rirg28nhi5srtv.apps.googleusercontent.com',
//           clientSecret: 'LiBBdVdJSD5Bu8F16vdY_p10',
//           refreshToken: '1//04ZyT5YmXJnv6CgYIARAAGAQSNwF-L9Ir0-w_2B3cDyGxzk0Xx9Cj83FiXGtbKxE2KN2w1dGIvnBbfVAmxMUBz-f3WTD52zazELU',
//         }
//     });

//     return transporter;
// };

// module.exports = {
//   send: (options) => {
//     return createTransporter().sendMail(options);
//   }
// };

const userEmail = 'bisouterie.amelie@gmail.com';
const clientId = '898836579607-qofdigbih7vfk0b4f6rirg28nhi5srtv.apps.googleusercontent.com';
const clientSecret = 'LiBBdVdJSD5Bu8F16vdY_p10';
const refreshToken = '1//04ZyT5YmXJnv6CgYIARAAGAQSNwF-L9Ir0-w_2B3cDyGxzk0Xx9Cj83FiXGtbKxE2KN2w1dGIvnBbfVAmxMUBz-f3WTD52zazELU'


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      type: 'OAuth2',
      user: userEmail,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: 'ya29.a0ARrdaM-uR7js0Zc9S_AdYoLe-99dPEE3xwuPKH22WJ4h31N1xB5Q07C_ooViRMgOPJ1KspSS1fw1f7iNnLDjYX2NIjgeWjuR95QdsHbsXqh1RoDW4_PnbKqNDpzKCDEf7kXnnRozu5STPnu-mvrkIxW3Az8YJw',
  }
});

module.exports = {
  send: (options) => {
    // Return a promise of the function that sends the email.
    return transporter.sendMail(options);
    
  },
};