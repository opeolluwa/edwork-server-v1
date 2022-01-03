"use strict";
//load in dependencies
const json_web_token = require('jsonwebtoken'); // generate token
require('dotenv').config(); //load in evn variable

const jwt = {
    // take payload, genetate token, it expires in six hour
    sign: (payload) => json_web_token.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' }),
    // take payload, verify token
    verify: (payload) => {
        try {
            const decoded = json_web_token.verify(payload, process.env.JWT_KEY);
            return decoded
        } catch (err) {
            // err
            return undefined
        }
    }
}
//export token
module.exports = jwt;

console.log(jwt.sign({foo: "bar"}), jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NDExOTQ4MTcsImV4cCI6MTY0MTE5ODQxN30.cV9dK4fSzR6SbUksYY4iAWiYJfaJGQvF6Uycq5dqmNo"));