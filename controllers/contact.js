//load in dependencies
const nodemailer = require('nodemailer');
const _ = require('lodash')

function contact_us(req, res, next) {
    //get the payload
    const { name, email, subject, message } = req.body
    res.send({ message: _.capitalize("message sent!") })

}



/* 
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
 */




/* TODO: admin to know number of people accessing his serveice
const express = require('express')
const router = express.Router()
const cors = require('cors')
const { add_contact, remove_contact, all_contact } = require('../controllers/contacts')
const validate_payload = require('../middleware/contact')


router.use(cors())
//default get all contacts
router.get('/',
)

//all contact
router.get("/all", all_contact)

//Add contact
router.post("/add", / validate_payload, / add_contact)
//remove contact
router.post("/remove", remove_contact)

//update contact
router.put("/update/:contact_email", (req, res) => {
    res.send({ message: "update contact" })
})
module.exports = router
*/





module.exports = { contact_us }