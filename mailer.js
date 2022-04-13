require('dotenv').config()
const nodemailer = require('nodemailer');
// const mail_list = require("../utils/mails") //import mails
const mail_list = "adeoyeao.18@student.funaab.edu.ng"


function mailer(req, res) {
    //access keys 
    /*   const { email, access_key, content } = req.body
      const { MAILER_ADDR: mailer_addr, MAILER_ACCESS_KEY: mailer_access_key } = process.env; */

    var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: "adefemi-adeoye@outlook.com",
            pass: "39G#0sts"
        }
    });

    var mailOptions = {
        from:  "adefemi-adeoye@outlook.com",
        to: mail_list,
        subject: 'Sending Email using Node.js',
        text: 'That was easy lorem ipsum!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);

        }
    });
}

mailer()
// module.exports = mailer