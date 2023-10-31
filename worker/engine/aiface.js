 const fs = require('fs')
 const https = require('https')
 const axios = require('axios');
  let httpsAgent = new https.Agent({
     rejectUnauthorized: false,
  })
 const md5 = require('md5')
let {
    getBuffer
} = require('./lib/function') 
 let url = 'https://ai.tu.qq.com/overseas/trpc.shadow_cv.ai_processor_cgi.AIProcessorCgi/Process';

 exports.aiFace = async(img) => { 
  return new Promise(async(resolve, reject) => {    
   const signV1 = (obj) => {
    const str = JSON.stringify(obj);
     return md5(
        'https://h5.tu.qq.com' +
        (str.length + (encodeURIComponent(str).match(/%[89ABab]/g)?.length || 0)) +
        'HQ31X02e',
     );
   };

    const obj = {
      busiId: 'different_dimension_me_img_entry',
                extra: JSON.stringify({
                    face_rects: [],
                    version: 2,
                    platform: 'web',
             }),                   
        images: [""+img.toString("base64")],
    };

    let sign = await signV1(obj)
    
    let xyos = await axios.request({              
               httpsAgent,     
               method: 'POST',
               url,
               data: obj,
               headers: {
                 'Content-Type': 'application/json',
                 'Origin': 'https://h5.tu.qq.com',
                 'Referer': 'https://h5.tu.qq.com/',
                 'User-Agent': "Mozilla/5.0 (Linux; Android 7.1.1; CPH1801) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
                 'x-sign-value': sign,
                 'x-sign-version': 'v1',
               },
        timeout: 30000,
       })
       .catch((e) => console.log(e))
         
         fs.writeFileSync('y.json', JSON.stringify(xyos.data))

         console.log(xyos.data)

    
         if(xyos.data.code == 0) {
           fs.writeFileSync('y.json', JSON.stringify(xyos.data))           
           let azfir = JSON.parse(xyos.data.extra)           
           console.log(azfir)
           let ns = new Buffer.from(azfir.img_urls[0], 'base64')
      fs.writeFileSync('x.jpg', await getBuffer(azfir.img_urls[0]))
       } else {  
      console.log(xyos.data)
    }
  })
}

(async()=>exports.aiFace( await fs.readFileSync('tes.jpg', 'base64')))()