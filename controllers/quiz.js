//import the dependencies
const { database } = require("../config/config.database")
const { randomQuestions } = require("../utils/nRandomItems")
//define a variable to control the number of questions
const TOTAL_NUMBER_OF_QUESTIONS = 70;

//a quiz generator
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
                const questions = randomQuestions(rows, TOTAL_NUMBER_OF_QUESTIONS)
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
            })
    } catch (error) {
        res.send(error)
    }
}


//get the subject and attempted questions, calculate the stats and send back to client
function quizMarker(req, res, next) {
    //get payload from client
    const { answers: idAndAnswersIndex, subject } = req.body
    const idOfAttemptedQuestion = Object.keys(idAndAnswersIndex)

    //create 2 variables to hold the dynamic query and the score count
    let scoreCount = 0;
    let dbQuery = "";

    /*use a for loop to dynamically generate the SQL
    * multi script for fetching RECORDS from the database
   * use a place holder in place of the id's ==> "WHERE (id =? )"
   */
    for (const field in idOfAttemptedQuestion) {
        // dbQuery += `SELECT id, answer, question FROM ${subject.toLowerCase()}_question_bank WHERE (id =? ); `
        dbQuery += `SELECT * FROM ${subject.toLowerCase()}_question_bank WHERE (id =? ); `
    }

    //the database transaction here
    database
        .promise()
        //pass the dynamically generated query and the destructured  id's as the sql query
        .query(dbQuery, [...idOfAttemptedQuestion])
        .then(([rows, fields]) => {
            /*  repackage from [[{id, answer}, ..., {id, answer}]] to [{id, answer}, ..., {id, answer}]*/
            let dbResultsHolder = []
            for (const elem in rows) {
                //Thanks to Tes for this fix 😊
                dbResultsHolder.push(rows[elem][0])
            }

            /*  repackage the result form an array of objects [{id, answer}, ..., {id, answer}] 
            * having  id and answer properties to a single object 
           * having the id as the property and the answer as value {<id> : <answer>}
           * that is from [{id, answer}, ..., {id, answer}] to {<id> : <answer>}
            */
            let answersHolder = {} // to hold computed answer
            let correctionsHolder = [] // to hold computer correction
            for (const elem of dbResultsHolder) {
                //destructure the content of the element to keep the code DRY
                const { answer, id, question, option_a, option_b, option_c, option_d } = elem
                //pass the destructured data from each "elem" and the user selected option to both answers and correction holder
                correctionsHolder.push({ id, question, option_a, option_b, option_c, option_d, userSelect: Number(idAndAnswersIndex[id]), answer:Number(answer) })
                Object.assign(answersHolder, { [id]: Number(answer) })

            }
            //pass the result  in form of { '336': 2, '337': 0, '338': 1, '339': 1, '340': 1 } to the next handler
            // console.log(correctionsHolder, /* answersHolder */);
            req.correction = correctionsHolder;
            return  answersHolder 
        })
        .then((answers) => {
            //get the id of the attempted questions, compare it with selected the user's option for question with same id, increment the scoreCount if match 
            for (const elem of idOfAttemptedQuestion) {
                if (idAndAnswersIndex[elem] == answers[elem]) {
                    scoreCount++
                }
            }
            //build the return value and including data to compute the stats and correction
            const score = scoreCount;
            const totalAttemptedQuestions = idOfAttemptedQuestion.length;
            const percentage = Number(((score / TOTAL_NUMBER_OF_QUESTIONS) * 100).toFixed(2))
            const correction = req.correction;

            console.log({ score, percentage, totalAttemptedQuestions, idOfAttemptedQuestion, totalQuestionFromServer: TOTAL_NUMBER_OF_QUESTIONS, correction })

            res.send({ score, percentage, totalAttemptedQuestions, idOfAttemptedQuestion, totalQuestionFromServer: TOTAL_NUMBER_OF_QUESTIONS, correction })
        })
}



module.exports = { quizGenerator, quizMarker }