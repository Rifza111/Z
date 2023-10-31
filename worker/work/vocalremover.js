const { vocalCutAi } = require('../engine/vocal')
const fs = require('fs')
module.exports = {
	order: ['vocalremover'],
	tags: 'tools',
	command: ['vocalremover'],
	maintenance: false,
	coin: false,
	quoted: false,
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	quotedImage: false,
	quotedAudio: 'Reply audionya!',
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	     let media = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')  
         let stream = fs.createReadStream(media)
         let v = await vocalCutAi(stream)
          await fs.unlinkSync(media)
	        await client.sendMessage(from, { audio: { url: v.vocal }, caption: 'only voice', mimetype: 'audio/mpeg' }, { quoted: msg })
     	    await client.sendMessage(from, { audio: { url: v.instrument }, caption: 'only instrument', mimetype: 'audio/mpeg' }, { quoted: msg })
	}
}