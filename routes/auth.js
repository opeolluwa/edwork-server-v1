const express = require('express')
const router = express.Router()
const cors = require('cors')
const { register, login } = require('../controllers/auth')
const { validate_auth_login, validate_auth_register } = require('../middleware/auth')


/*
* endpoints  are
* POST :: /auth/login {returns jwt}
* POST :: /auth/sign-up { register user, return "successfully" added || "already exists"}
* POST :: /auth/reset {end token to user email for password reset}
*/


router.use(cors())
router.post("/sign-up", validate_auth_register, register) // register user
router.post("/login", validate_auth_login, login) //login user

//TODO: update user data
//TODO:: reset password

module.exports = router