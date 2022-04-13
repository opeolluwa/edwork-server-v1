require("dotenv").config();
const cors = require('cors')
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const PORT = process.env.PORT || 3000
const MySQLStore = require('express-mysql-session')(session);
const { databaseConnectionOptions } = require("./config/config.database")


const ImageKit = require("imagekit");
const fs = require('fs');

const imagekit = new ImageKit({
    privateKey: "private_XfAev+SIN0dmZSo0M2I37YziqCY=",
    urlEndpoint: "https://ik.imagekit.io/nethbooks", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
    publicKey: "public_b3JXmhrMjodPOOdBhSA7ZVmvMp8=", // op
});

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
app.use(cors(/* {credentials:true, exposedHeaders:["set-cookie"]} */))
app.use(session({
    key: 'session_cookie_name',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    unset: "destroy", //destroy expired session data
    //use secure cookie only in production environment
    cookie: { secure: process.env.NODE_ENV === "production" ? true : false }
}));
// 6StSEj4rqTNV3sy
//import routes
const contact = require('./routes/contact') //contact form
const auth = require('./routes/auth') //{login, logout, register and account recovery}
const files = require('./routes/files') //search database for files {add, search, update fields and delete}
const forum = require('./routes/forum') //forum {add, search, update fields and delete}
const profile = require("./routes/profile") //user profile {get:/profile, post:profile/update}
const quiz = require("./routes/quiz") //mock quiz {post:subject}
const notification = require("./routes/notification"); //notification {get:notification, returns new notification, post(admin):/notification/add, add notification using admin privileges}

//Mount routes
app.use("/contact", contact)
app.use('/files', files)
app.use('/forum', forum)
app.use("/auth", auth);
app.use("/profile", profile);
app.use("/quiz", quiz);
app.use("/notification", notification)


app.get("/imagekit/auth", (req, res) => {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.send(authenticationParameters)

})

// create the connection test
app.get("/", (req, res) => {
    /*  console.log(req.session.id);
     console.log(req.session); 
     req.session.isAuth = true; */
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
