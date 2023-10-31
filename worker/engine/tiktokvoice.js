const axios = require('axios');

exports.tiktokVoice = async (text, voice) => {
return new Promise(async(resolve, reject) => {
let type = (voice || "id_001");
const url = 'https://gesserit.co/api/tiktok-tts';
const payload = {
  text: text,
  voice: type
};

axios.post(url, payload)
  .then(response => {
    resolve(new Buffer.from(response.data.base64, 'base64'))
  })
  .catch(error => {
    reject(error)
  });
})
}