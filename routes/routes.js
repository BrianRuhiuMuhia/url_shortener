const express=require("express")
const router=express.Router()
const {home, addUrlToDB,getUrl}=require("../controllers/controllers.js")
router.get("/home",home)
router.post("/shorten",addUrlToDB)
router.get("/search",getUrl)
module.exports=router