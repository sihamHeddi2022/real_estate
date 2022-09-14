const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    first_name:String,
    last_name:String,
    adress : {
      street:String
     - city
     - country
     - postal code
    }
    - aboutme
    - profil_image
}) 
