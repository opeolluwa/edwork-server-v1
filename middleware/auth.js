const email_validator = require("email-validator");
const validUrl = require('valid-url');
const _ = require('lodash');
const jwt = require("../utils/jwt");
const { database } = require("../config/config.database");
const otpGenerator = require('otp-generator')



//middleware for handling user authentication :; signup, login and search query
module.exports = {
    //verify registration data
    validateRegister: (req, res, next) => {
        //fetch data from pay load
        const { email, firstname, lastname, password } = req.body
        //!use_email
        if (!email_validator.validate(email)) {
            return res.status(400).send({ message: _.capitalize("please provide a valid email") })
        }
        //!user_first_name
        if (!firstname) {
            return res.status(400).send({ message: _.capitalize("please provide first name") })
        }
        //!user_last_name
        if (!lastname) {
            return res.status(400).send({ message: _.capitalize("please provide last name") })
        }
        //!password
        if (!password || password.length < 8) {
            return res.status(400).send({ message: _.capitalize("please enter a password of minimum of  8 characters") })
        }
        //proceed with othe transaction
        next();
    },

    //verify login details
    validateLogin: (req, res, next) => {
        //fetch data from pay load
        const { email, password } = req.body
        //!use_email
        if ((!email) || (!email_validator.validate(email))) { return res.status(400).send({ message: "invalid mail or password" }) }
        if (!password) { return res.status(400).send({ message: _.capitalize("invalid email or password") }) }
        next();
    },

    //checks if user add token to header and validate token
    validateAuthToken: (req, res, next) => {
        try {
            //get payload headers
            const auth_headers = req.headers["authorization"] || req.headers["Authorization"];
            //check if not undefined
            if (typeof auth_headers !== 'undefined') {
                const jwt = auth_headers.split(" ")[1]
                //pass it to next controller or middleware
                req.token = { jwt };
                // return res.send(jwt)
                next();
            }
        } catch (error) {
            //if no auth headers is found send forbidden
            res.status(403).send({ message: _.capitalize("forbidden!") })

        }
    },
    //verify token
    decodeJWT: (req, res, next) => {
        try {
            //get token from validateAuthToken middleware
            const { jwt: token } = req.token;

            //send unauthorize error if token not found lse fire on
            if (!jwt.verify(token)) {
                res.status(403).send({ message: _.capitalize("forbidden!") })
            }
            const user = jwt.verify(token);
            req.user = user
            next();
        } catch (error) {
            res.status(403).send({ message: _.capitalize("forbidden!") })
        }


    },




    //check if user is registered
    isEmailRegistered(req, res, next) {
        const { email } = req.body
        database.promise()
            .query("SELECT * FROM user_information WHERE LOWER(email) = ?", [email])
            .then(([rows, fields]) => {
                //add user if not exist
                if (!rows[0]) {
                    return res.send({ message: `The provided email &quot;${email}&quot; is not registered with us exists`, error: true })
                }
                req.email = { email }
                next()

            });
    },




    //receive and revalidate token sent to user for account reset or update
    sendOTPtoEmail(req, res, next) {
        const { email } = req.email;
        /* TODO: generate opt,
        * store otp in session store and send it to email,
        * if session has not expired,
        * if session has expired tell user to restart session,
        *  drop all value in the session store
        */
        const OTP = otpGenerator.generate(6, { specialChars: false });
        console.log(`the reset token  ${OTP} has been sent to ${email}`);
        next()
    },



    //receive and revalidate token sent to user for account reset or update
    confirmSentOTP(req, res, next) {
        //get the token, be it as payload or as router params
        /* check the session if it's still active,
        * if not send prompt user to restart
        * either way, drop the old otp used for validation
        * then proceed to allow the user set new password or to request for new otp for account reset
        */

        //get otp from session store here then proceed to compare
        const storedOTP = "11kzva";
        const { otp, email } = req.body
        console.log(otp);
        if (!otp || otp !== storedOTP) {
            //TODO: check if token match here
            return res.send({ error: true, message: "invalid reset token, please try again" })
        }
        else {
            return res.send({ error: false })
        }
        // next();
    }
}