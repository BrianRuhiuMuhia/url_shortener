function shortenUrlFunc(url)
{
    const nUrl=new URL(url)
    const name=nUrl.hostname.split(".")[1]
    return `${name}${randomNoGen(url)}`
    
}
function randomNoGen(url)
{
const rInt=10000000
const num=url.length *rInt
return Math.floor(Math.random() * num +1)
}
module.exports={shortenUrlFunc,randomNoGen}