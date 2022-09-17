const mongoose = require("mongoose")

const houseSchema = new mongoose.Schema({

   title:String,
   price:Number,
   description:String,
   location : {
        city:String ,
        adress : {
           street:String ,
           zip_codes:Number
        }
    },

   category :{                
          type:String,
          enum:[
            "Apartment",
           "Cottage",
            "Castle",
            "Villa",
           "Family house"
          ],
    },

    business_type :  {
        type:String,
        enum:[
          "rent",
         "sale",
      
        ],
      
    },
    
    num_bedrooms:{
      type:Number,
      min:1,
      max:5
    },
    num_bathrooms :{
        type:Number,
        min:1,
        max:5
      },

    area  :{
        type:Number,
        min:200,
        max:1000
      },
    price :{
        type:Number,
        min:200,
        max:1000
      },
    image:String,
    OwnerID : String,
    avalaible : {
        type:Boolean,
        default:true
    }
  


},{timestamps:true}) 
const House = mongoose.model("house",houseSchema)

module.exports= {
    House
}
