//import dependencies, lodah for formating return text and jwt for managing token
const _ = require('lodash');
const jwt = require("../utils/jwt");


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
                res.status(403).send({ message: _.capitalize("forbidden!") })
            }
            //else fire on
            const user = jwt.verify(token);
            req.user = user
            next();
        } catch (error) {
            res.status(403).send({ message: _.capitalize("forbidden!") })
        }

    }
}