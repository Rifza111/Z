const fs = require("fs")
const axios = require("axios")

const { t1 } = require("./t1")

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


const startTaskPhotoRestore = async(imgurl, actions) => {
 return new Promise(async(resolve, reject) => {
   let body = {
        "image_url": imgurl,
        "actions": actions,
        "client_id": "ailab",
        "version": "2.0"
    }
   let ticket = await t1(body)
   let { data } = await axios.post("https://ai.nero.com/api/v2/task",
   {
    "body": body,
    "ticket": ticket,
    "type": "imgfix",
    "sub_type": "photo_restore",
    "client_id": "ailab"
   },
   {
    headers: {
       Cookie: 'LoginWebHook={"avatarChange":false}',
       Origin: "https://ai.nero.com",
       Referer: "https://ai.nero.com/photo-restore"  
    }
   }
  )
  resolve(data)
 })
}


module.exports = { taskStatus, startTaskPhotoRestore }

