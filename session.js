require("dotenv").config();
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);
const PORT = process.env.PORT || 3300
const { databaseConnectionOptions, database } = require("./config/config.database");
const { randomQuestions } = require("./utils/nRandomItems");


//instantiate the session
const connection = mysql.createPool(databaseConnectionOptions);
const sessionStore = new MySQLStore({
    expiration: 86400000,
    endConnectionOnClose: true,
    createDatabaseTable: true,
    charset: 'utf8mb4_bin',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, connection);

//instantiate express app
const app = express();
app.use(express.json())
app.use(session({
    key: 'session_cookie_name',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    // cookie: { path: "/profile" }
}));

app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    res.send("data store created for for Session! it all starts here " + req.session.id)
})


app.get("/create", (req, res) => {
    req.session.isAuth = true

    //experimental create temporary database while the session lasts, store data and return the data
    database
        .promise()
        .query("CREATE TEMPORARY TABLE IF NOT EXISTS edwork.session_23456  ( id INT NOT NULL AUTO_INCREMENT, name VARCHAR(45) NULL, age VARCHAR(45) NULL,  PRIMARY KEY (id))")
        .then(([rows, field]) => {
            res.send("data store created for for Session! it all starts here " + req.session.id)
            console.log(req.session);
            console.log(req.session.id);
        })
        .catch((error) => {
            console.log(error.message);
        })
})



//add data into session database
app.get("/quiz", (req, res) => {
    //get the subject from the user agent
    const subject = "english"
    try {
        //fetch the questions that correspond to the client's request
        database
            .promise()
            .query(`SELECT * FROM ${subject.toLowerCase()}_question_bank`)
            .then(([rows, fields]) => {
                //extract 50 random questions from the result
                //filter the response to be sent, send only question and option, keep a reference to the answer in the user table using a uniques id
                const questions = randomQuestions(rows, 50)
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
                            question, option_a, option_b, option_c, option_d, id, store
                        }

                    })

                return questions;
            }).then((r) => {
                const { question, option_a, option_b, option_c, option_d, id, store } = r

                res.json({r})
            })
    } catch (error) {
        res.send(error)
    }
})




//end session : check if database exist after the session has been destroyed
app.get("/destroy", (req, res) => {
    req.session.destroy()
})



app.listen(PORT, () => {
    console.log(`session started on http://localhost:${PORT}/`);
})