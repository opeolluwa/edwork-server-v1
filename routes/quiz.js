const express = require("express")
const router = express.Router()
const cors = require('cors')
const { quizGenerator, quizMarker, } = require("../controllers/quiz");


router.post("/", quizGenerator);
router.post("/submit", quizMarker, ((req, res) => {
    console.log(req.score);
}));

router.use(cors())

module.exports = router