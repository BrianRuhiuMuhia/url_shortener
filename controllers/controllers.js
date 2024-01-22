const {db}=require("../db/db.js")
const {checkUrl,shortenUrl}=require("../utils/utils.js")
const server=`http://localhost:5000/api/search?url=`
let data={}
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

await db.query("select * from url where url=$1",[url],async (err,result)=>{
    
    if(result.rows.length<1)
    {
        await db.query("insert into url(url,url_short,clicks) values($1,$2,$3)",[url,shortUrl,0])
        data["url"]=`${server}${shortUrl}`
    }
    else{
        data["url"]=`${server}${result.rows[0]["url_short"]}`
    
    }
    return res.render("url-page.ejs",{ data: data })
})

   
}
catch(err)
{
    console.log(err)
}
}

async function getUrl(req,res){
const url=req.query.url

try{
await db.query("select url from url where url_short=$1",[url],(err,result)=>{
if(err)
{
console.log(err)
}

    if(result.rows[0])
    {
         const pageUrl=result.rows[0]["url"]
    if(pageUrl)
    {
        return res.redirect(pageUrl)
    }
    }
   else{
        return res.render("homePage.ejs")
    }
})
}
catch(err)
{
    console.log(err)
}


}
module.exports={home,addUrlToDB,getUrl}