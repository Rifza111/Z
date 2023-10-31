const axios = require('axios')
const FormData = require('form-data');

exports.speech = async(text, type) => {
return new Promise(async(resolve, reject) => {

let data = new FormData();
data.append("locale", 'jv-ID')
data.append("content", '<voice name="'+type+'"> ' + text + ' </voice>')
data.append("ip", '103.105.35.83')
 let vyos = await axios({ 
   url: 'https://app.micmonster.com/restapi/create',
   method: 'POST',
   data: data,
   headers: {
	...data.getHeaders()
   },
   }).catch(()=> reject({ err: true }))   
let res = new Buffer.from(vyos.data, 'base64')
resolve(res || 'err')
})
}
