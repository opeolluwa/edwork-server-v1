//import config  and dependencies
require("dotenv").config()
const nodemailer = require('nodemailer');
// const mjml2html = require('mjml');

const { ADMIN_EMAIL, ADMIN_EMAIL_PASS } = process.env
//in house details 
const FROM = "'Opeoluwa <opeoluwa@mailer.com>'";

// define a module that takes receiver's email, email subject, email subtitle, email body and send the mal
function mailer({ userEmail, subject, subtitle, template }, feedback) {

    //import the the mailer package and construct mode mailer opts
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 2525,
        secure: false,
        auth: {
            user: ADMIN_EMAIL,
            pass: ADMIN_EMAIL_PASS
        }
    });


    //build the mail options, the user details, the sender details, the subject and pr-emade template to use
    const mailOptions = {
        from: FROM,
        to: userEmail,
        subject,
        html: template
    }

    //execute the transfer
    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            //if no error, send the feedback
            // res.send({feedback})
            console.log(info);
        }
    })
}

module.exports = mailer 