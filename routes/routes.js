const express=require("express")
const router=express.Router()
const {home, addUrlToDB, shortUrlPage}=require("../controllers/controllers.js")
router.get("/home",home)
router.post("/shorten",addUrlToDB)
router.get("/shorturlpage",shortUrlPage)
module.exports=router