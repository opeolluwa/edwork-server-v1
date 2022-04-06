const express = require('express')
const router = express.Router()
const cors = require('cors')
const { decodeJWT, validateAuthToken } = require('../middleware/profile');
const { liveFeed, postsAndComments } = require('../controllers/forum');

router.use(cors())
//send live feed
router.get('/feed', /* validateAuthToken, decodeJWT, */ liveFeed)
router.get("/posts/:postId", postsAndComments)
module.exports = router