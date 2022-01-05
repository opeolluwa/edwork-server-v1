module.exports = {
    //handle sending emails
    validate_contact_us_mails(req, res, next) {
        //get the payload
        const { email, subject, name, message } = req.body

        //if !email or invalid emai
        if ((!email_validator.validate(email)) || !email) {
            return res.status(400).send({ message: _.capitalize("please provide a valid e-mail") })
        }
        //if not name
        if (!name) {
            return res.status(400).send({ message: _.capitalize("please provide your name") })
        }
        //if not subject or little detail provided
        if ((!subject) || (subject.length < 5)) {
            return res.status(400).send({ message: _.capitalize("please provide more details in subject feed") })
        }
        //if not message 
        if ((!message) || (message.length < 15)) {
            return res.status(400).send({ message: _.capitalize("please provide more details in message feed") })
        }
        //continue to next middleware ()
        next()

    },
}