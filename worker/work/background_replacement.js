const axios = require("axios")
const FormData = require('form-data')
const cheerio = require("cheerio")
const moment = require("moment-timezone")
const time = moment.tz('Asia/Jakarta').format('YYYY-MM-DD')
const fs = require("fs")

function generateRandomName(format) {
	let result = ''
	const alphabetLength = 26
    const length = 10
	for (let i = 0; i < length; i++) {
		const randomValue = Math.floor(Math.random() * alphabetLength)
		const randomLetter = String.fromCharCode('a'.charCodeAt(0) + randomValue)
		result += randomLetter
	}
   
	return result + "-" + Math.floor(Math.random() * 100000000) + format
}

const background_replacement = async(file, prompt) => {//file buffer or fs readFile
	return new Promise(async(resolve,reject) => {
	let formData = new FormData()
	let name = await generateRandomName(".jpg")
     	formData.append('fileBg', file, {
          filename: name, 
         });
        formData.append('changes', prompt);
        console.log(formData)
    axios.request("https://boredhumans.com/background_replacement_api.php", {
         method: "POST",
         data: formData,
         headers: {
           "Content-Type": "multipart/form-data",
           "Cookie": "boredHuman=" + time + "; text-removal=4",
           "Origin": "https://boredhumans.com",
           "Referer": "https://boredhumans.com/background_replacement.php"
         }
    }).then(a => {
     let $ = cheerio.load(a.data)
     console.log(a)
     let res = $("img").attr("src")
        resolve({ output: res })
    })       
})
}

module.exports = {
	order: ['replacebg','editbg','editbackground','replacebackground'],
	tags: 'tools',
	command: ['editbackground'],
	maintenance: true,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: 'Reply imagenya!!',  //quotedImage: "pesannya"
	quotedAudio: false,  //quotedAudio: "pesannya"
	premium: false,  //true/false
	coin: false, //coin: "normal"
	quoted: "Example: .editbackground borobudur temple", //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	  let media = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
      client.sendMessage(from, {
				react: {
					text: "⏱️",
					key: msg.key
				}
      })
      let { output } = await background_replacement(await fs.readFileSync(media), q)      
      console.log(output)
      if(output == false) return msg.reply("Error!, please try another image!")
        client.sendMessage(from, { image: { url: output }, caption: `Result`}, { quoted: msg })
	}
}