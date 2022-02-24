const express = require("express")
const router = express.Router()
const cors = require('cors')
const { quiz } = require("../controllers/question");

router.post("/", quiz);
router.use(cors())

module.exports = router