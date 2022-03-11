require("dotenv").config();
const cors = require('cors')
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const PORT = process.env.PORT || 3000
const MySQLStore = require('express-mysql-session')(session);
const { databaseConnectionOptions } = require("./config/config.database")

//instantiate the the application and session 
const app = express();
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


//mount general middleware
app.use(express.json())
app.use(cors())
app.use(session({
    key: 'session_cookie_name',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    //use secure cookie only in production environment
    cookie: { secure: process.env.NODE_ENV === "production" ? true : false }
}));

//import routes
const contact = require('./routes/contact') //contact form
const auth = require('./routes/auth') //{login, logout, register and account recovery}
const files = require('./routes/files') //search database for files {add, search, update fields and delete}
const profile = require("./routes/profile") //user profile {get:/profile, post:profile/update}
const quiz = require("./routes/quiz") //mock quiz {post:subject}
const notification = require("./routes/notification"); //notification {get:notification, returns new notification, post(admin):/notification/add, add notification using admin privileges}

//Mount routes
app.use("/contact", contact)
app.use('/files', files)
app.use("/auth", auth);
app.use("/profile", profile);
app.use("/quiz", quiz);
app.use("/notification", notification)

// create the connection test
app.get("/", (req, res) => {
    console.log(req.session.id);
    console.log(req.session);

    req.session.isAuth = true;
    res.send("Session! it all starts here ")
    /*  res.json({
         session: req.session,
         id: req.session.id,
         status: res.status,
         state: "Session! it all starts here"
     }); */
})

app.get("/end", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.send({ error: error.message })
        }
        return res.send("session destroyed")
    })
})
app.listen(PORT, () => {
    console.log(`API listening on port http://localhost:${PORT}`)
});
