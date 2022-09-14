const routes = require("express").Router()



routes.get("/",(req,res)=>{
    return res.render("index") 

})

routes.get("/properties",(req,res)=>{
    return res.render("properties") 

})

routes.get("/login",(req,res)=>{
    return res.render("signin") 

})

routes.get("/register",(req,res)=>{
    return res.render("register") 

})


routes.get("/dashboard",(req,res)=>{
    return res.render("admin/pages/dashboard",{"title":"Dashboard"}) 

})

routes.get("/admin/houses",(req,res)=>{
    return res.render("admin/pages/houses",{"title":"Houses"}) 

})
routes.get("/admin/orders",(req,res)=>{
    return res.render("admin/pages/orders",{"title":"Orders"}) 

})
routes.get("/admin/profile",(req,res)=>{
    return res.render("admin/pages/profile",{"title":"Profile"}) 

})


module.exports = {
    routes
}