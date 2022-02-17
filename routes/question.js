const express = require("express")
const router = express.Router()
const cors = require('cors')
const question = require("../controllers/database");

router.get("/", question);

module.exports = router