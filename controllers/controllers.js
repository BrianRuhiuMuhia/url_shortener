const {db}=require("../db/db.js")
const {checkUrl,shortenUrl}=require("../utils/utils.js")
function home(req,res){
return res.render("homePage")
}
function shortenUserUrl(url)
{
 const checkedUrl=checkUrl(url)
 console.log(checkedUrl)  
    if(url && checkedUrl)
    {
const shortenedUrl=shortenUrl(url)
return shortenedUrl
    }
    return new Error("problem shortenning url")
}
async function addUrlToDB(req,res)
{
    const url=req.body.link
    console.log(req.body)
    const shortUrl=shortenUserUrl(url)
try{
    await db.query("insert into url(url,url_short,clicks) values($1,$2,$3)",[url,shortUrl,0])
    return res.redirect("http://localhost:5000/api/shorturlpage")
}
catch(err)
{
    console.log(err)
}
}
function shortUrlPage(req,res)
{
    return res.render("url-page.ejs")
}
module.exports={home,addUrlToDB,shortUrlPage}