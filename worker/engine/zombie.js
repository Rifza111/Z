const request = require('request');
const fs = require('fs');

exports.makeZombie = async(path) => {
 return new Promise(async(resolve, reject) => {
 let img = await fs.createReadStream(path) 
 request.post({
 url: "https://deepgrave-image-processor-no7pxf7mmq-uc.a.run.app/transform_in_place",
 formData: {
 image: img
 },
 contentType: 'multipart/form-data'
 },
 async (error, response, body) => { 
 resolve({ base64: body })
 })
 
 })
}