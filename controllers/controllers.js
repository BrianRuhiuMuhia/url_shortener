const {db}=require("../db/db.js")
const {shortenUrlFunc,randomNoGen}=require("../utils/utils.js")
const serverEndpoint="http://localhost:5000/api/tinyUrl"
async function renderHomePage(req,res){
return res.render("home-page.ejs")
}
async function shortenUrl(req,res){
const {url}=req.body
let shortUrl=undefined
let newUrl=undefined
try{
const result=await db.query("select * from url where url = $1",[url])
if(result.rows.length>0 && Array.isArray(result.rows))
{
    newUrl=result.rows[0]["new_url"]
}
else{
    id=randomNoGen(url)
    shortUrl=shortenUrlFunc(url)
    newUrl=`${serverEndpoint}/${shortUrl}`
    await db.query("insert into url(id,url,short_url,new_url) values($1,$2,$3,$4)",[id,url,shortUrl,newUrl])
}
return res.status(201).json({"mssg":newUrl})
}
catch(err)
{
    console.log(err)
}
return res.status(501).json({"mssg":"error retry"})
}
async function searchUrl(req,res){
const {url}=req.params
let newUrl=`${serverEndpoint}/${url}`
try{
const result=await db.query("select * from url where new_url=$1",[newUrl])
const url=result.rows[0]["url"]
if(url)
    return res.redirect(url)
else
return res.status(501).send({mssg:"error"})
}
catch(err)
{
    console.log(err)
}
return res.status(200).json({})
}
module.exports={renderHomePage,shortenUrl,searchUrl}