function checkUrl(url)
{
    let checkedUrl=undefined
try{
checkedUrl=new URL(url)
}
catch(err)
{
    console.log(err,url)
    return false
}
return true
}
function shortenUrl(url)
{
const userUrl=new URL(url)
const hostname=userUrl.hostname
const server=`http://localhost:5000/api/search`
const shortUrl=`${server}?${hostname}${generateRandomString(url)}.com`
return shortUrl
}
function generateRandomString(url)
{
    let randomStr=""
    for(let i=0;i<4;i++)
    {
        let randomInt=Math.floor(Math.random() * url.length)
        randomStr+=url[randomInt]
    }
    return randomStr
}
module.exports={shortenUrl,checkUrl}