require("dotenv").config();
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);
const PORT = process.env.PORT || 3300
const { databaseConnectionOptions } = require("./config/db-connection")


//instantiate the session
const connection = mysql.createPool(databaseConnectionOptions);
const sessionStore = new MySQLStore({
    expiration: 86400000,
    endConnectionOnClose: true,
    createDatabaseTable: true,
    charset: 'utf8mb4_bin',
    schema: {
        tableName: 'session_table',
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
    req.session.isAuth = true
    console.log(req.session);
    console.log(req.session.id);
    res.send("Session! it all starts here")
})

app.listen(PORT, () => {
    console.log(`session started on http://localhost:${PORT}/`);
})