const express = require('express')
const router = express.Router()
const cors = require('cors')
const { validate_contact_us_mails } = require('../middleware/contact') //import validator middle ware
const { contact_us } = require('../controllers/contact')//import contaollers

router.use(cors())

//send mails
router.post('/', validate_contact_us_mails, contact_us)

module.exports = router