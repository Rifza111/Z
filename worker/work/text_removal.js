const axios = require("axios")
const FormData = require('form-data')

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

const text_removal = async(file) => {//file buffer or fs readFile
	return new Promise(async(resolve,reject) => {
	let frm = new FormData()
	let name = await generateRandomName(".jpg")
	frm.append("file", file , name)
	
	async function uploadImg(){
     return new Promise(async(resolve,reject) => {
       axios.request("https://boredhumans.com/text_removal_upload.php", {
         method: "POST",
         data: frm,
         headers: {
           "content-type": "multipart/form-data; boundary=" + frm._boundary,
         }
       }).then(a => {
        resolve(a.data)
       })
      })
     }
     
    let fileName = await uploadImg()
    console.log(fileName)
    axios.request("https://boredhumans.com/text_removal_api.php", {
         method: "POST",
         data: { 
           file: fileName
         },
         headers: {
           "content-type": "multipart/form-data;"
         }
    }).then(a => {
        resolve(a.data)
    })       
})
}

module.exports = {
	order: ['removetext','textremoval','removewm'],
	tags: 'tools',
	command: ['removetext','textremoval','removewm'],
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
	quoted: false, //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	  let media = await client.downloadMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
      client.sendMessage(from, {
				react: {
					text: "⏱️",
					key: msg.key
				}
      })
      let { output } = await text_removal(media)      
      console.log(output)
      if(output == false) return msg.reply("Error!, please try another image!")
        client.sendMessage(from, { image: { url: output }, caption: `Result`}, { quoted: msg })
	}
}