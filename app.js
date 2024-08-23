const express=require("express")
const dotenv=require("dotenv")
const app=express()
const router=require("./routes/routes.js")
const ejs=require("ejs")
dotenv.config()
app.use(express.static("public"))
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/",router)
app.all("*",(req,res)=>{
    return res.render("home-page.ejs")
})
app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})