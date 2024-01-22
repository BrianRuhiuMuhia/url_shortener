const {db}=require("../db/db.js")
const {checkUrl,shortenUrl}=require("../utils/utils.js")
const data={}
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
    const shortUrl=shortenUserUrl(url)
try{
data["url"]=shortUrl
    await db.query("insert into url(url,url_short,clicks) values($1,$2,$3)",[url,shortUrl,0])
    console.log(data)
    return res.render("url-page.ejs",{ data: data })
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