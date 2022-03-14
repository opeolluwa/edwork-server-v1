const express = require('express')
const router = express.Router()
const cors = require('cors')
const { register,
    login,
    logout,
    setNewPassword,
    confirmSentToken,
    isEmailRegistered } = require('../controllers/auth')
const { validateLogin, validateRegister, } = require('../middleware/auth')


/*
* endpoints  are
* POST :: /auth/login {returns jwt}
* POST :: /auth/sign-up { register user, return "successfully" added || "already exists"}
* POST :: /auth/reset {end token to user email for password reset}
*/


router.use(cors())
router.post("/sign-up", validateRegister, register) // register user
router.post("/login", validateLogin, login) //login user
router.post("/reset/confirm-email", isEmailRegistered)
router.post("/reset/confirm-token", confirmSentToken) //verify user email

//TODO: create a temporary data table to store session id and reset token, table columns are to be dropped after 10 minutes, table columns are to be reset on retries



// router.get("/reset?token=:token", isEmailRegistered, sendResetLinkToEmail, setNewPassword)

module.exports = router