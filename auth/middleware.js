

const checkAuth = (req,res,next)=>{
    if (req.isAuthenticated()) {
        next()
    }
    return res.redirect("/login")
}

const checkNotAuth = (req,res,next)=>{
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard")
    }
    return next()
}

module.exports  = {
    checkAuth,
    checkNotAuth
}