const inputField=document.getElementById("input-field")
const subBtn=document.getElementById("sub-btn")
const pageInfo=document.querySelector(".page-info")
const urlRegex=/^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(:[0-9]{1,5})?(\/[^\s]*)?$/
const errorMssg=document.getElementById("error-mssg")
const errorMessages={
    "badUrl":"bad URL check URL",
    "required":"enter the url"
}
function checkUrl(url)
{
    if(url==null || url=="" || url.length<0 ){
    errorMessagesInfo("required")
    return false
    }
try{
    if(new URL(url) && urlRegex.test(url))
        {
            successMessagesInfo()
          return true
        }
        else{
            errorMessagesInfo("badUrl")
            return false
        }
    }
    catch(err)
    {
        errorMessagesInfo("badUrl")
        return false
    }
   
}
async function postData(url)
{
    const data={
        url:url
    }
try{

const shortUrl=await fetch("http://localhost:5000/api/shorten",{
    method:"POST",
headers:{
"Content-type":"application/json"
},
body:JSON.stringify(data)
})
return await shortUrl.json()
}
catch(err)
{
    console.log(err)
}
return {"mssg":"error"}
}
function errorMessagesInfo(mssg){
    errorMssg.textContent=errorMessages[mssg]
    inputField.classList.add("field-error")
    errorMssg.classList.remove("hidden")
}
function successMessagesInfo()
{
    inputField.classList.remove("field-error")
    errorMssg.classList.add("hidden")
}
subBtn.addEventListener("click",(e)=>{
e.preventDefault()
let url=inputField.value
    if(checkUrl(url))
    {
        pageInfo.classList.remove("hidden")
        postData(url).then((data)=>{
pageInfo.textContent=data["mssg"]
        })
    }
})
