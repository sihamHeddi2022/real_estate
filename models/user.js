const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    first_name:String,
    last_name:String,
    adress : {
      street:String,
      city:String,
      country:String,
      postal_code:Number
    },
    aboutme:String,
    profil_image:String
}) 
const User = mongoose.model("user",UserSchema)

module.exports= {
  User
}
