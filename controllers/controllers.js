const {db}=require("../db/db.js")
const {checkUrl,shortenUrl}=require("../utils/utils.js")
const server=`http://localhost:5000/api/search?url=`
function home(req,res){
return res.render("homePage")
}
function shortenUserUrl(url)
{
 const checkedUrl=checkUrl(url)
 
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
const data={}
data["url"]=`${server}${shortUrl}`
    await db.query("insert into url(url,url_short,clicks) values($1,$2,$3)",[url,shortUrl,0])

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
async function getUrl(req,res){
const url=req.query.url
let searchedPage=undefined
try{
await db.query("select url from url where url_short=$1",[url],(err,result)=>{
    if(result.rows)
    {
        searchedPage=result.rows[0]["url"]
        return res.redirect(searchedPage)
    }
    else{
        return res.redirect("/home")
    }
})
}
catch(err)
{
    console.log(err)
}


}
module.exports={home,addUrlToDB,shortUrlPage,getUrl}