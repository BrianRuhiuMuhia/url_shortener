const express=require("express")
const dotenv=require("dotenv")
const app=express()
const router=require("./routes/routes.js")
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.set("view engine","ejs")
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use("/api/",router)
app.all("*",(req,res)=>{
    return res.render("404-page.ejs")
})
app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})