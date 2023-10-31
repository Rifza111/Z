const { TelegraPh } = require('../engine/telegraph')
const fs = require("fs")

module.exports = {
    order: ['tourl','telegraph'],
	tags: 'ai',
	command: ['telegraph'],
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
	quotedImage: "Reply imagenya!",  //quotedImage: "pesannya"
	quotedAudio: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	let media = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
        let tph = await TelegraPh(media)
        fs.unlinkSync(media)
          await msg.reply(tph)
	}
}