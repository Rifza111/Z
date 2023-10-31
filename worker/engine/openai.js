const SETTING = require('../../validator/config')

const { Configuration, OpenAIApi } = SETTING['modul']['openai']
const key = SETTING['api']['openai'][1]
const configuration = new Configuration({ apiKey : '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' });
const openai = new OpenAIApi(configuration);  

const chatGPT = async(prompt) => {
return new Promise(async(resolve, reject) => {
   try{
     const c = await openai.createChatCompletion({
           model: "gpt-3.5-turbo",
           messages: [{ role: "system", content: `Ini adalah WhatsappBot - Multidevice, saya diberi nama ${SETTING["botName"]} yang di buat oleh ${SETTING["ownerName"]}.` },{role: "user", content: prompt}],
         });          
        resolve(c)
     } catch (e) {
       reject(e)
     }
 })     
}

module.exports = { chatGPT }