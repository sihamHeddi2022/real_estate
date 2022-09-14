const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({

    email:String,
    phone:Number,
    first_name:String,
    last_name:String,
    adress : {
      street:String,
      city:String,
      country:String,
      postal_code:Number
    },

}) 
const Client = mongoose.model("client",clientSchema)

module.exports= {
    Client
}
