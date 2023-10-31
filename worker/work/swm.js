const fs = require('fs')
let {
	writeExifStc
} = require('../engine/exif')

module.exports = {
	order: ['swm','stickerwm','take','colong'],
	tags: 'maker',
	command: ['take'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: false,  //quotedImage: "pesannya"
	quotedAudio: false,  //quotedAudio: "pesannya"
	premium: false,  //true/false
	coin: false, //coin: "normal"
	quoted: false, //quoted: "pesannya"
	quotedSticker: 'Reply stickernya!', //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
            let text1 = q.split("|")[0]
            let text2 = q.split("|")[1]
              if (!text1) return msg.reply(`Contoh! : ${order + ' ' + 'tes|rifza'}`)    
              if (!text2) return msg.reply(`Contoh! : ${order + ' ' + 'tes|rifza'}`)
          try{ 
             let buff = await client.downloadMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
             console.log(buff)
             let proc = await writeExifStc(buff, { packname: text1, author: text2 })
             await client.sendMessage(from, { sticker: { url: proc } }, { quoted: msg })
             await fs.unlinkSync(proc)
           } catch (e) { console.log(e); msg.reply(`${e}`) }                  
	}
}