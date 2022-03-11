//load in dependencies
const express = require('express');
const router = express.Router()
const cors = require('cors');
const { profile_information, update_profile_information } = require('../controllers/profile');
const { decodeJWT, validateAuthToken, email_update_exists, username_update_exists, phone_update_exists } = require('../middleware/profile');


/*
* endpoints  are
* POST :: /profile  {returns user account information}
* POST :: /profile/update { update user account information with payload provided}
*/

router.use(cors())
/*
* accept token in headers
* validate token with validateAuthToken,
* decode token, get user id from the decoded token
* use the user_id to get user profile information 
* TODO: check if user with the same email, phone or username exists 
*/

router.post("/update", validateAuthToken, decodeJWT, email_update_exists, username_update_exists, phone_update_exists, update_profile_information)


/*
* accept token in headers
* validate token with validateAuthToken,
* decode token, get user email using decodeJWT
* update user account information using update_profile_information
*/
router.get("/", validateAuthToken, decodeJWT, profile_information)


module.exports = router