const express=require("express")
const {renderHomePage,shortenUrl,searchUrl}=require("../controllers/controllers")
const router=express.Router()
router.get("/home",renderHomePage)
router.post("/shorten",shortenUrl)
router.get("/tinyUrl/:url",searchUrl)
module.exports=router