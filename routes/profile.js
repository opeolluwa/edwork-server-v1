//load in dependencies
const express = require('express');
const router = express.Router()
const cors = require('cors');
const { profile_information, update_profile_information } = require('../controllers/profile');
const { decode_jwt, validate_auth_token, email_update_exists, username_update_exists, phone_update_exists } = require('../middleware/profile');


/*
* endpoints  are
* POST :: /profile  {returns user account information}
* POST :: /profile/update { update user account information with payload provided}
*/

router.use(cors())
/*
* accept token in headers
* validate token with validate_auth_token,
* decode token, get user id from the decoded token
* use the user_id to get user profile information 
* TODO: check if user with the same email, phone or username exists 
*/

router.post("/update", validate_auth_token, decode_jwt, email_update_exists, username_update_exists, phone_update_exists, update_profile_information)


/*
* accept token in headers
* validate token with validate_auth_token,
* decode token, get user email using decode_jwt
* update user account information using update_profile_information
*/
router.get("/", validate_auth_token, decode_jwt, profile_information)


module.exports = router