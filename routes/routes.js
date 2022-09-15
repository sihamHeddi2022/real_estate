const { checkAuth, checkNotAuth } = require("../auth/middleware")
const {User}= require("../models/user")
const routes = require("express").Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")
const { House } = require("../models/house")


routes.get("/",(req,res)=>{
    return res.render("index") 

})

routes.get("/properties",async(req,res)=>{
    let query_params = req.query
    const query = Object.keys(query_params).length>0? {"location.city":{$regex:query_params.city, $options: 'i'},category:query_params.category,price:{$lte:query_params.minPrice,$gte:query_params.maxPrice},area:{$lte:query_params.minArea,$gte:query_params.maxArea},num_bedrooms:query_params.bedrooms,num_bathrooms:query_params.bathrooms, business_type:query_params.type}:{}
 
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


routes.get("/dashboard",checkAuth,(req,res)=>{
    return res.render("admin/pages/dashboard",{"title":"Dashboard"}) 

})

routes.get("/admin/houses",checkAuth,(req,res)=>{
    return res.render("admin/pages/houses",{"title":"Houses"}) 

})
routes.get("/admin/orders",checkAuth,(req,res)=>{
    return res.render("admin/pages/orders",{"title":"Orders"}) 

})
routes.get("/admin/profile",checkAuth,(req,res)=>{
    return res.render("admin/pages/profile",{"title":"Profile"}) 

})


module.exports = {
    routes
}