const { database } = require("../config/config.database")
const { randomQuestions } = require("../utils/nRandomItems")
global.score = 0;


function quizGenerator(req, res) {
    //get the subject from the user agent
    const { subject } = req.body
    try {
        //fetch the questions that correspond to the client's request
        database
            .promise()
            .query(`SELECT * FROM ${subject.toLowerCase()}_question_bank`)
            .then(([rows, fields]) => {
                //extract 50 random questions from the result
                //filter the response to be sent, send only question and option, keep a reference to the answer in the user table using a uniques id
                const questions = randomQuestions(rows, 70)
                    .map((questions) => {
                        /*   {
                         "id": 194,
                         "question": "In a school, 220 students offer Biology or Mathematics or both, 125 offer Biology and 110 Mathematics. How many offer Biology but not Mathematics?",
                         "option_a": "95",
                         "option_b": "80",
                         "option_c": "125",
                         "option_d": "110",
                         "answer": "3",
                         "date_added": "2022-01-23T22:55:03.000Z"
                       }, */
                        const { question, option_a, option_b, option_c, option_d, answer, id } = questions
                        const store = { answer, id }

                        //pares the response, send it over to the next then handler
                        return {
                            question, option_a, option_b, option_c, option_d, id/* , store */
                        }

                    })
                res.send({ questions })
                //proceed to store the answers here
            })/* .then(async (response) => {
                const { question, option_a, option_b, option_c, option_d, answer, id } = response
                res.send({ question, option_a, option_b, option_c, option_d, answer, id })
            }) */
    } catch (error) {
        res.send(error)
    }
}

function quizMarker(req, res, next) {
    //get payload from client
    const { answers: idAndAnswersIndex, subject } = req.body
    const idOfAttemptedQuestion = Object.keys(idAndAnswersIndex)
    // console.log(subject, idAndAnswersIndex);
//[3,65, 45,102]
    /*    idOfAttemptedQuestion.forEach(element => {
           database
               .promise()
               .query(`SELECT answer FROM ${subject.toLowerCase()}_question_bank WHERE (id =? )`, [element])
               .then(([rows, fields]) => {
                   if (rows[0].answer == idAndAnswersIndex[element]) {
                       counter += 1;
                   }
               })
   
       }); */
    var counter = 0;
    // console.log(counter);
    for (const element of idOfAttemptedQuestion) {
        database
            .promise()
            .query(`SELECT answer FROM ${subject.toLowerCase()}_question_bank WHERE (id =? )`, [element])
            .then(([rows, fields]) => {
                counter = 0

                if (rows[0].answer == idAndAnswersIndex[element]) {
                    counter += 1;
                    // console.log(counter);

                }
            })
    }
    console.log(counter);
}




module.exports = { quizGenerator, quizMarker }


//a function that takes in a number an <array> as first argz and a <size> as second and return  