// load in dependencies
const jwt = require("../utils/jwt")
const _ = require('lodash');
const { database } = require("../config/config.database")
const { v4: uuidv4 } = require('uuid');
const { hash_password, compare_hash } = require("../utils/bcrypt")


//Register user
function register(req, res) {
    //fetch data from pay load
    const { firstname, lastname, email, password } = req.body
    //try to add user to database, first check if user exists
    try {
        database.promise()
            .query("SELECT * FROM user_information WHERE LOWER(email) = ?", [email])
            .then(([rows, fields]) => {
                //add user if not exist
                if (rows[0]) {
                    return res.send({ message: `An account with the email <strong>${email}</strong> already exists`, error: true })
                }
                //inform user of existence if found
                else {
                    database
                        .promise()
                        .query("INSERT INTO user_information (user_id, firstname, lastname, email, password)  VALUES (?,?,?,?,?)", [uuidv4(), firstname, lastname, email, hash_password(password)])
                        .then(([rows, fields]) => {
                            return res.send({ message: `<strong>${email}</strong> ${_.capitalize(" has been successfully registered")}`, error: false })
                        })
                        .catch(error => {
                            return res.send({ message: _.capitalize("An error occurred! please retry"), error: true })
                        })
                    // .then(() => database.end());
                }
            })
            .catch(error => console.log(error))
    } catch (error) {
        //tell user to retry on error
        return res.send({ message: _.capitalize("An error occurred! please retry"), error: true })
    }
}





//login user return jwt
function login(req, res) {
    const { email, password } = req.body

    console.log(email);
    //check if user exists
    database
        .promise()
        .query("SELECT * FROM user_information WHERE LOWER(email) =?", [email])
        .then(([rows, fields]) => {

            //if user is found,  validate data then return data and access token
            if (rows[0]) {
                //data retrieved from database
                const { user_id, password: hash, email, firstname } = rows[0];

                //compare req.body.user_password with stored hash
                if (compare_hash(password, hash)) {
                    //send token if true, TODO: begin session once use login
                    const jwt_token = jwt.sign({ user_id, email, firstname })
                    return res.send({ user_id, email, firstname, jwt_token })
                }

                //if data does not match, send error 
                if (!compare_hash(password, hash)) {
                    return res.send({ error: _.capitalize("Invalid email or password") })
                }
            }
            //user if not found,
            else {
                return res.send({ error: `<strong>${email}</strong> is not registered!` })
            }
        })
        .catch(error => console.log(error))
    //REFACTOR :: fix database throwing error when connection is closed
    // .then(() => database.end())
}


//update user password
function setNewPassword(req, res) {
    const { email } = req.email;

    const { password, confirmPassword, } = req.body
    //new password missing
    if (!password || password.length < 8) {
        return res.status(400).send({ error: true, message: "new password may not be less than 8 characters" })
    }
    //now password missing
    if (!confirmPassword || confirmPassword.length < 8) {
        return res.status(400).send({ error: true, message: "confirm password may not be less than 8 characters" })
    }
    //password unmatched
    if (password !== confirmPassword) {
        return res.status(400).send({ error: true, message: "password does not match" })
    }

    //password match
    database
        .promise()
        .query("UPDATE user_information SET password = ?  WHERE LOWER(email) = ?", [password, email])
        .then(() => {
            return res.send({ message: "password reset successful", email, pass: hash_password(password) })
        })

}

//logout user, expire session now
function logout(req, res, next) {
    req.session.destroy();
}

//check if user is registered and confirmed for account reset and validation
function isEmailRegistered(req, res, next) {
    const { email } = req.body
    database.promise()
        .query("SELECT * FROM user_information WHERE LOWER(email) = ?", [email])
        .then(([rows, fields]) => {
            if (!rows[0]) {
                return res.send({ message: `The provided email &quot;${email}&quot; is not registered!`, error: true })
            }
            const userId = rows[0].user_id
            req.email = { email }
            req.userId = { userId }
            console.log(email, userId);
            /* next() */
            return res.send({ error: false })
        });
}


function generateResetLink(req, res, next) {
    //get the user email and id from the previous middleware
    const { email: userEmail } = req.email
    const { userId } = req.userId

    //add user id, user email, otp and time to encryption payload
    const otp = otpGenerator.generate(6, { specialChars: false });
    const timeStamp = Date.now();
    const token = jsonwebtoken.sign({
        data: { otp, userEmail, userId, timeStamp },
    }, process.env.SESSION_SECRET, { expiresIn: '1h' });
    const resetLink = `${BASE_URL}/reset?token=${token}`

    /*  database
         .promise()
         // .query("SELECT * FORM reset_links WHERE LOWER(email) = ? ", [userEmail])
         .query("INSERT INTO reset_links (otp, email, user_id, timestamp,reset_link) VALUES (?,?,?,?,?)", [otp, userEmail, userId, timeStamp, resetLink])
         .then(([rows, fields]) => {
         }) */

    req.resetLink = { resetLink }
    next();

}

//receive and revalidate token sent to user for account reset or update
function sendResetLinkToEmail(req, res, next) {
    const { email } = req.email;
    const { resetLink } = req.resetLink
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

}



//receive and revalidate token sent to user for account reset or update
function confirmSentToken(req, res, next) {
    //get the token, be it as payload or as router params
    /* check the session if it's still active,
    * if not send prompt user to restart
    * either way, drop the old otp used for validation
    * then proceed to allow the user set new password or to request for new otp for account reset
    */
    const { token } = req.body
    console.log(token);
    return
}


//export class 
module.exports = {
    register,
    login,
    logout,
    setNewPassword,
    confirmSentToken,
    isEmailRegistered
}