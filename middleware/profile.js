//import dependencies, lodash for formatting return text and jwt for managing token
const _ = require('lodash');
const database = require('../config/config.database');
const jwt = require("../utils/jwt");
const email_validator = require("email-validator");

//the middleware to handle user account
module.exports = {
    //checks if user add token to header and validate token
    validate_auth_token: (req, res, next) => {
        try {
            //get payload  authorization headers
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


    //verify token if it's signed using the secrete key or not, then decode it and proceed to user profile route
    decode_jwt: (req, res, next) => {

        try {
            //get token from validate_auth_token middleware
            const { jwt: token } = req.token;
            //send unauthorized error if token not found
            if (!jwt.verify(token)) {
                res.status(403).send({ message: _.capitalize("forbidden bbb!") })
            }
            /*else fire on 
            * token contains :: { user_id, firstname, email }*  all encrypted in login controllers
            * const jwt_token = jwt.sign({ user_id, email, firstname })
             */
            const user = jwt.verify(token);
            // res.send(user)
            req.user = user
            next();
        } catch (error) {
            res.status(403).send({ message: _.capitalize("forbidden!") })
        }

    },


    //check if  email being changed already exists
    email_update_exists(req, res, next) {
        //get the user id from the decoded jwt,
        const { email: decoded_email } = req.user;
        const { email: new_email } = req.body;

        //    return res.send({current_user_id, email})
        /*get profile details associated with the email being used for update
        * if the email is the same as that of the current user,
        * tell the user the mail already exist on his profile
        * else if it belongs to someone else, tell him it is in use 
        * else proceed with the update
        */

        // if email is not valid 
        if (!email_validator.validate(new_email)) {
            return res.status(400).send({ message: _.capitalize("please provide a valid email"), error: true })
        }


        else {
            //case: new email is same as current email in the decoded token
            if (decoded_email === new_email) {
                return res.send({ message: `The email "<strong>${new_email}</strong>" in use by you`, error: true })
            }

            //case : new email is different from decoded_email, check database if the mail exist there 
            else if (decoded_email !== new_email) {
                database.promise()
                    .query("SELECT * FROM user_information WHERE LOWER(email) = ?", [new_email])
                    .then(([rows, fields]) => {
                        //email exist on another user profile
                        if (rows[0]) {
                            return res.send({ message: `The email "<strong>${new_email}</strong>" in use by another user`, error: true })
                        }

                    });
            }
            /* proceed if the new email is
            * not same as the current user's 
            * and the email does not exist in the database
           */
            next();



        }



    },


    //check if  phone being changed already exists
    phone_update_exists(req, res, next) {
        database.promise()
            .query("SELECT * FROM user_information WHERE LOWER(phone) = ?", [phone])
            .then(([rows, fields]) => {
                //add user if not exist
                if (rows[0]) {
                    return res.send({ message: `The phone number "<strong>${phone}</strong>" is in use by another user`, error: true })
                }
            })
        // proceed if otherwise
        next();
    },


    //check if username,  being changed already exists
    username_update_exists(req, res, next) {
        database.promise()
            .query("SELECT * FROM user_information WHERE LOWER(email) = ?", [email])
            .then(([rows, fields]) => {
                //add user if not exist
                if (rows[0]) {
                    return res.send({ message: `the username "<strong>${username}</strong>" is already taken`, error: true })
                }
            })
        // proceed if otherwise
        next();
    },
}