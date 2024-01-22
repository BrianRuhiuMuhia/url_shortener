const express=require("express")
const router=express.Router()
const {home, addUrlToDB, shortUrlPage,getUrl}=require("../controllers/controllers.js")
router.get("/home",home)
router.post("/shorten",addUrlToDB)
router.get("/shorturlpage",shortUrlPage)
router.get("/search",getUrl)
module.exports=router