require('dotenv').config()
const mysql = require('mysql2');
const databaseConnectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_ACCESS_KEY,
    database: process.env.DB_SCHEMA,
    multipleStatements: true
};

//create database connection instance 
const database = mysql.createConnection(databaseConnectionOptions)

database.connect(err => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + database.threadId);
});

//modularize connection option and database connection
module.exports = {
    databaseConnectionOptions,
    database
}