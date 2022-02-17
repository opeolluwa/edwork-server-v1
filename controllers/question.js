const database = require("../config/config.database")
const { randomQuestions } = require("../utils/nRandomItems")



function quiz(req, res) {
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
                const response = randomQuestions(rows, 50)
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
                res.send(response)
                //proceed to store the answers here
            })/* .then(async (response) => {
                const { question, option_a, option_b, option_c, option_d, answer, id } = response
                res.send({ question, option_a, option_b, option_c, option_d, answer, id })
            }) */
    } catch (error) {
        res.send(error)
    }

}

module.exports = { quiz }


//a function that takes in a number an <array> as first argz and a <size> as second and return  