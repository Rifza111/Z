const fs = require("fs")
const SETTING = require('../../validator/config')
let success = SETTING['message'][7]

module.exports = {
	order: ['setthumb','setthumbnail'],
	tags: 'owner',
	command: ['setthumb'],
	maintenance: false,
	coin: false,
	quoted: false,
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: false,
	owner: true,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	quotedImage: "Reply imagenya!",
	quotedAudio: false,
	premium: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	  try { 
        let media = await client.downloadMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
          await fs.writeFileSync('./lib/container/image/thumb.jpg', media)
        msg.reply(success)	
       } catch (e) {
       msg.reply("Type Err : " + e)
      }
	}
}