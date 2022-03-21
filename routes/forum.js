const express = require('express')
const router = express.Router()
const cors = require('cors')
const { decodeJWT, validateAuthToken } = require('../middleware/profile');
const { liveFeed } = require('../controllers/forum');

router.use(cors())
//send live feed
router.get('/feed', /* validateAuthToken, decodeJWT, */ liveFeed)

module.exports = router