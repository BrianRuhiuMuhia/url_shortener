const express=require("express")
const dotenv=require("dotenv")
const app=express()
dotenv.config()
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.json())
app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})