require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()
const cors = require('cors')

//routes
const analytics = require('./routes/analytics') //analytics
const contact = require('./routes/contact') //contact form
const auth = require('./routes/auth') // authentication
const ssr = require('./routes/ssr') // serverside rendering
const files = require('./routes/files') //search database
const profile = require("./routes/profile") //user profile
const quiz = require("./routes/question") //user profile


//load in routes and cors
app.use(cors())
app.use(express.json())

app.use("/analytics", analytics)
app.use("/contact", contact)
app.use('/files', files)
app.use("/ssr", ssr)
<<<<<<< HEAD
app.use("/ssr", ssr)
=======
app.use("/questions", quiz)
>>>>>>> 2355ae40949d9958a49b710382e85c099ab24c6f

/*
* endpoints  are
* POST :: /auth/login {returns jwt}
* POST :: /auth/sign-up { register user, return "successfully" added || "already exists"}
* POST :: /auth/reset {end token to user email for password reset}
*/app.use("/auth", auth);

/*
* endpoints  are
* POST :: /profile  {returns user account information}
* POST :: /profile/update { update user account information with payload provided}
*/app.use("/profile", profile);



// create the connection test
app.get("/", (req, res) => {
<<<<<<< HEAD
    res.send("Ignition started, whatever happens don't shout")
=======
    res.send("Ignition started, whatever happens don't shout" )
>>>>>>> 2355ae40949d9958a49b710382e85c099ab24c6f
})


app.listen(PORT, () => {
    console.log(`API listening on port http://localhost:${PORT}`)
});
