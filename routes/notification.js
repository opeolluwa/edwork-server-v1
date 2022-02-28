const express = require('express')
const router = express.Router()
const cors = require('cors')
const { get_notification } = require('../controllers/notification')

/*
* endpoints  are
* GET :: /  {TODO: create a session and persist connection to server and database}
*/

router.use(cors())
router.get("/", get_notification);

module.exports = router
