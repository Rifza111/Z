let SET = require('../../validator/config')
let xm_z = SET['api']['sightengine'][Math.floor(Math.random() * SET['api']['sightengine'].length)];
const axios = require('axios');
let api_user = xm_z['api_user']
let api_secret = xm_z['api_secret']

const nudity = async(url) => {
return new Promise (async (resolve, reject) => {
let data = await axios.get('https://api.sightengine.com/1.0/check.json', {
  params: {
    'url': url, 
    'models': 'nudity-2.0',
    'api_user': api_user,
    'api_secret': api_secret,
   }
 })
resolve(data.data)
})
}
module.exports = { nudity }