const express = require('express')
const router = express.Router()
const cors = require('cors')
const { register, login, setNewPassword } = require('../controllers/auth')
const { validateLogin, validateRegister, isEmailRegistered, sendOTPtoEmail, confirmSentOTP } = require('../middleware/auth')


/*
* endpoints  are
* POST :: /auth/login {returns jwt}
* POST :: /auth/sign-up { register user, return "successfully" added || "already exists"}
* POST :: /auth/reset {end token to user email for password reset}
*/


router.use(cors())
router.post("/sign-up", validateRegister, register) // register user
router.post("/login", validateLogin, login) //login user
//TODO: create a temporary data table to store session id and reset token, table columns are to be dropped after 10 minutes, table columns are to be reset on retries

//TODO: match /reset and /reset?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWU1NWUzYWYtNTA2Ni00NjQ5LThmYTQtOTBiM2M5NTM2NTExIiwiZW1haWwiOiJzZXNzaW9uQG1vZGUuY29tIiwiZmlyc3RuYW1lIjoib3Blb2xsdXdhIiwiaWF0IjoxNjQ2OTQzNjY3LCJleHAiOjE2NDY5NDcyNjd9.DSipQvfuUq1zTZdtiw-GeABrW8XvYX83DVCIynjHK5w
router.post("/password-reset", /* isEmailRegistered, sendOTPtoEmail, */ confirmSentOTP, setNewPassword)
router.get("/reset?token=:token", isEmailRegistered, sendOTPtoEmail, setNewPassword)

module.exports = router