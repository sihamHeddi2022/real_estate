const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy

async function authenticateUser(email,password,done) {
   try {
    const user = User.findOne({email:email})

    if(!user) done(null,flase,{message:"the credentials are not correct"})
    
    const p = await bcrypt.compare(password,user.password)
    if(!p) done(null,flase,{message:"the password is not correct"})
    done(null,user)
   } catch (error) {
      done(error)
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