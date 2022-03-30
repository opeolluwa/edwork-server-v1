const { database } = require("../config/config.database")
const { randomQuestions } = require("../utils/nRandomItems")
global.score = [];


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


//get the subject and attempted questions, calculate the stats and send back to client
function quizMarker(req, res, next) {
    //get payload from client
    const { answers: idAndAnswersIndex, subject } = req.body
    const idOfAttemptedQuestion = Object.keys(idAndAnswersIndex)


    let scoreCount = 0;
    let dbQuery = "";

    //dynamically generate the SQL multi script for fetching RECORDS from the database
    for (const field in idOfAttemptedQuestion) {
        dbQuery += `SELECT id, answer FROM ${subject.toLowerCase()}_question_bank WHERE (id =? ); `
    }


    database
        .promise()
        .query(dbQuery, [...idOfAttemptedQuestion])
        .then(([rows, fields]) => {
            /*  repackage from [[{id, answer}, ..., {id, answer}]] to [{id, answer}, ..., {id, answer}]*/
            let dbResultsHolder = []
            for (const elem in rows) {
                //Thanks to Tes for this fix 😊
                dbResultsHolder.push(rows[elem][0])
            }

            /*  repackage from [{id, answer}, ..., {id, answer}] to {<id> : <answer>}*/
            let answersHolder = {}
            for (const elem of dbResultsHolder) {
                Object.assign(answersHolder, { [elem.id]: Number(elem.answer) })
            }
            //pass the in form of { '336': 2, '337': 0, '338': 1, '339': 1, '340': 1 } to the next handler
            return answersHolder
        })
        .then((answers) => {
            //get the id of the attempted questions, compare it with selected the user's option for question with same id, increment the scoreCount if match 
            for (const elem of idOfAttemptedQuestion) {
                if (idAndAnswersIndex[elem] == answers[elem]) {
                    scoreCount++
                }
            }
            //build the return value
            const score = scoreCount;
            const totalAttemptedQuestions = idOfAttemptedQuestion.length;
            const percentage = Number(((score / totalAttemptedQuestions) * 100).toFixed(2))

            console.log({ score, percentage, totalAttemptedQuestions, idOfAttemptedQuestion });
            res.send({ score, percentage, totalAttemptedQuestions, idOfAttemptedQuestion })
        })
}



module.exports = { quizGenerator, quizMarker }