const rNo=1000000
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
const shortUrl=`${hostname}${generateRandomString(url)}.com`
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
function generateRandomId()
{
    return Math.floor(Math.random() * rNo + 20)
}
module.exports={shortenUrl,checkUrl,generateRandomId}