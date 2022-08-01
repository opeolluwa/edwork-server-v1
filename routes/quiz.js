const express = require("express")
const router = express.Router()
const cors = require('cors')
const { quizGenerator, quizMarker, } = require("../controllers/quiz");
const { decodeJWT, validateAuthToken, } = require('../middleware/profile');


router.post("/", validateAuthToken, decodeJWT, quizGenerator);
router.post("/submit", validateAuthToken, decodeJWT, quizMarker, ((req, res) => {
    console.log(req.score);
}));

router.use(cors())

module.exports = router