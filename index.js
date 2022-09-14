const express = require('express')
const path = require("path")
const app = express()
const {routes} = require("./routes/routes")
const mongoose = require("mongoose")
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const initialize = require("./auth/auth")

const dbURI = "mongodb://localhost:27017/realEstate"

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")))
app.use("/assets",express.static(path.join(__dirname,"public","admin","assets")))


app.use(flash())
app.use(session({
    secret:"jzjj2929sp28djsdjddhdh282dhdhsd",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
initialize()

app.set("views","public")

app.use(routes)

mongoose.connect(dbURI,function (err) {
    if(err) throw err
    app.listen(3000, () => {
        console.log(`Server is Listening on 3000`)
    })
})

