const { checkAuth, checkNotAuth } = require("../auth/middleware")
const {User}= require("../models/user")
const routes = require("express").Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")
const { House } = require("../models/house")
const { Client } = require("../models/client")
const {Order} = require("../models/order")
const path = require("path")

const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/img")
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})


routes.get("/",(req,res)=>{
    return res.render("index") 

})
 

  routes.get("/contact/:id",(req,res)=>{
    return res.render("contact",{id:req.params.id}) 
  })

routes.post("/contact",async(req,res)=>{
    const {id,email} = req.body

    try {
        let client = await Client.findOne({email:email})
        if(!client){
           client = await new Client({
            email:email,
            phone:req.body.phone,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            adress : {
              street:req.body.street,
              city:req.body.city,
              country:req.body.country,
              postal_code:req.body.postal_code
            }
           }).save()

        }
        else {
            if (await Order.findOne({houseID:id,  clientID: client._id})) {
                req.flash("error","this order already exists")
                return res.redirect("/contact/"+id)
            }
        }
        const house = await House.findOne({_id:id})
        if(!house) {
            req.flash("error","there is no house with that id")
            return res.redirect("/contact/"+id)
        }
        const order = await new Order({
            OwnerID: house.OwnerID,
            clientID: client._id,
            houseID: house._id,
        })
        await order.save()
        req.flash("success","Order succefully created !!")
        
        return res.redirect("/contact/"+id)



    } catch (error) {
        console.log(error);
        req.flash("error","internal error server")
        return res.redirect("/contact/"+id)

    } 
  })




// routes.get("/properties-detail/:id",async(req,res)=>{
//     let id = req.params.id
 
//         const house = await House.findById(id)
//         if(!house) return res.redirect("/")
//         console.log(house);

//         return res.render("properties-detail",{house:house}) 
 
 
     

// })

routes.get("/properties",async(req,res)=>{
    let query_params = req.query
    const query = Object.keys(query_params).length>0? {"location.city":{$regex:query_params.city, $options: 'i'},category:query_params.category,price:{$gte:query_params.minPrice,$lte:query_params.maxPrice},area:{$gte:query_params.minArea,$lte:query_params.maxArea},num_bedrooms:query_params.bedrooms,num_bathrooms:query_params.bathrooms, business_type:query_params.type}:{}
 
        const houses = await House.find(query)
        console.log(houses);

        return res.render("properties",{houses:houses,query:query_params}) 
 
 
     

})

routes.route("/disconnect").get(checkAuth,(req,res)=>{
    req.session.destroy();
     return res.redirect('/'); 
})


routes.route("/login").get(checkNotAuth,(req,res)=>{
    return res.render("signin") 

}).post(checkNotAuth, passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }))


routes.route("/register").get(checkNotAuth,(_req,res)=>{
    return res.render("register") 

})
.post(checkNotAuth,async(req,res)=>{
    try {
     
        const {email,password} = req.body

    const user = await User.findOne({email:email})
    
    if(user) {
        req.flash("error","the user with that email already exists")
        return res.redirect("/register")
    }

    const selt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(password,selt)
    await new User(req.body).save()
    req.flash("info","you have successfully registered please login")
    return res.redirect("/login")
    } catch (error) {
        req.flash("error","there is something wrong in the server try that later ")
        console.log(error);
        return res.redirect("/register")
    }

})


routes.get("/dashboard",checkAuth,async(req,res)=>{
    try {
    
        // const orders = await Order.find({OwnerID:req.user._id})
        // console.log(orders);
        return res.render("admin/pages/dashboard",{"title":"Dashboard"})
        

    } catch (error) {
        console.log(error);
        return res.render("admin/pages/dashboard",{"title":"Dashboard"})

    }
    

})

routes.get("/admin/houses",checkAuth,async(req,res)=>{
    
    const houses = await House.find({OwnerID:req.user._id})
     
    return res.render("admin/pages/houses",{"title":"Houses","houses":houses}) 

})
routes.route("/admin/add").get(checkAuth,(req,res)=>{
    return res.render("admin/pages/add")
}).post(checkAuth,upload.single("image"),async(req,res)=>{
    const {street,city,zip_codes,...rest} = req.body
    
    const location = {
        street:street,
        city:city,
        zip_codes:zip_codes
    }
    
    rest.image = ".."+req.file.path.split("public")[1]
    rest.location = location
    rest.OwnerID = req.user._id
    
    await new  House(rest).save()

    return res.render("admin/pages/add")
})
routes.get("/order/:id/:status",checkAuth,async(req,res)=>{
    
    const orders = await Order.findOne({_id:req.params.id,status:"pending"})
    if (!orders) {
        req.flash("errors","the order does not exist or may be delivered before")
        return res.redirect("/admin/orders")
    }

    if(req.params.status == 1) orders.status = "accepted"
    else  orders.status = "rejected"
  
    await orders.save()
  
    req.flash("success","success !!")
   
    return res.redirect("/admin/orders")

})

routes.get("/admin/orders",checkAuth,async(req,res)=>{
    const orders = await Order.find({OwnerID:req.user._id,status:"pending"})
    
    const clients =  await Client.find({})

    let order_details = []
    
    orders.forEach(r=>{
        clients.forEach(e=>{
            if (e._id==r.clientID) {
             
                order_details.push({"client":e,"order":r})    
               
            }
        })
    })




      
    return res.render("admin/pages/orders",{"title":"orders","orders":order_details}) 
  

})
routes.get("/admin/profile",checkAuth,(req,res)=>{
    return res.render("admin/pages/profile",{"title":"Profile"}) 

})


module.exports = {
    routes
}