const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy

async function authenticateUser(email,password,done) {
   try {
    const user = await User.findOne({email:email})

    if(!user) return done(null,false,{messages:"the credentials are not correct"})
    const p = await bcrypt.compare(password,user.password)
    if(!p) return done(null,false,{messages:"the password is not correct"})
    return done(null,user)
   } catch (error) {
      return done(error)
   }

}

function intialize() {
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
      return done(null, User.findById(id))
    })
}

module.exports = intialize