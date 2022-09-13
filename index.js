const express = require('express')
const path = require("path")
const app = express()
const {routes} = require("./routes/routes")
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")))
app.set("views","public")

app.use(routes)

app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})