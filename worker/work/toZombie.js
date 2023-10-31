const { makeZombie } = require("../engine/zombie")
const fs = require('fs');
module.exports = {
	order: ['imgtozombie','tozombie','zombie'],
	tags: 'ai',
	command: ['imgtozombie'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: "Reply Imagenya!", //quotedImage: "pesannya"
	quotedAudio: false, //quotedAudio: "pesannya"
	premium: false, //true/false
	coin: false, //coin: "normal"
	quoted: false, //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
 	await client.sendMessage(from, {
			react: {
					text: "⏱️",
					key: msg.key
	 }
 })
 let media = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
 let toZombie = await makeZombie('./' + media)
 let buffer = new Buffer.from(toZombie.base64, "base64")
 client.sendMessage(from, { image: buffer, caption: "Success!" }, { quoted: msg })
	}
}