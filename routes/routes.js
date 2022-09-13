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






module.exports = {
    routes
}