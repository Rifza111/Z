/*  Create By @rifza.p.p

    Concept and code creator: @rifza.pp 
    
    ▪︎ Thanks for ai.nero.com
    ▪︎ Thanks to rifza(my self)
    
 */
   
const fs = require("fs")
const axios = require("axios")

//khusus bikin ticket
const { t1 } = require("./t1")

const createTaskFaceDetector = async(imgurl) => {
  return new Promise(async(resolve, reject) => {
  let body = {
        "image_url": imgurl,
        "client_id": "ailab"
    }
  let ticket = await t1(body)
  let { data } = await axios.post("https://ai.nero.com/api/v2/task",
   {
    "body": body,
    "ticket": ticket,
    "type": "imgani-face",
    "client_id": "ailab"
   },
   {
    headers: {
       Cookie: 'LoginWebHook={"avatarChange":false}',
       Origin: "https://ai.nero.com",
       Referer: "https://ai.nero.com/face-animation"  
    }
   }
  )
    resolve(data)
  })
}


const taskStatus = async(id) => {
  return new Promise(async(resolve, reject) => {
  let get = await axios.get("https://ai.nero.com/api/v2/task/status?task_id=" + id,
   {
    headers: {
       Cookie: 'LoginWebHook={"avatarChange":false}',
       Origin: "https://ai.nero.com",
       Referer: "https://ai.nero.com/face-animation",
       "X-Client-Id": "imgani-web",
       "X-Client-Version": "2.8.8.13"
    }
  })
    resolve(get.data)
  })
}

const getFacePosition = async(imgurl) => {
 return new Promise(async(resolve, reject) => {
 let pollingInterval = {};      
 let date = new Date() * 1
 
 const { task_id } = await createTaskFaceDetector(imgurl)
   console.log(task_id)
   async function checkStatus() {
     const { status, result } = await taskStatus(task_id)
     if(status == "done") {
         clearInterval(pollingInterval[date]);
         resolve(result)
      }     
   }
    const pollingIntervall = 1000;
      pollingInterval[date] = setInterval(checkStatus, pollingIntervall);
 })
}


const startTaskFaceAnimate = async(imgurl, facePositions) => {
 return new Promise(async(resolve, reject) => {
   let body = {
        "image_url": imgurl,
        "face_positions": facePositions,
        "client_id": "ailab"
    }
   let ticket = await t1(body)
   let { data } = await axios.post("https://ai.nero.com/api/v2/task",
   {
    "body": body,
    "ticket": ticket,
    "type": "imgani-infer",
    "client_id": "ailab"
   },
   {
    headers: {
       Cookie: 'LoginWebHook={"avatarChange":false}',
       Origin: "https://ai.nero.com",
       Referer: "https://ai.nero.com/face-animation"  
    }
   }
  )
  resolve(data)
 })
}


module.exports = { startTaskFaceAnimate, getFacePosition, taskStatus }