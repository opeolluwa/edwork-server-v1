require('dotenv').config()
const mysql = require('mysql2');

//create database connection
const database = mysql.createConnection({
    host:"localhost",
    user: "sillicone",
    password:"",
    database:"oldshelf_x"
})


//init database trasaction
database.connect(err => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + database.threadId);
});


module.exports = database ;