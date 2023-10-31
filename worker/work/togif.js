const fs = require("fs")
const { webp2mp4File } = require('../../lib/function')
const SETTING = require('../../validator/config')
let success = SETTING['message'][7]

module.exports = {
	order: ['togif'],
	tags: 'tools',
	command: [ 'togif'],
	quoted: false,
	quotedUrl: false,
	quotedSticker: 'Reply Stickernya!', 
	quotedStickerVideo: 'Sticker harus type video!',
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
      let buffer = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
            webp2mp4File(buffer).then((data) => {  
               client.sendMessage(from, { video: { url: data.result }, caption: success, gifPlayback: true}, { quoted: msg })
             })
            .then(() => { fs.unlinkSync(buffer) })
	}
}