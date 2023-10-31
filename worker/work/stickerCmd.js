const { 
   getCmd,
   addCmds, 
   getCommandPosition 
} = require('../../lib/container/database/sticker.js')
const fs = require("fs")

module.exports = {
	order: ['setcmd','delcmd','listcmd'],
	tags: 'other',
	command: ['setcmd','delcmd','listcmd'],
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
	quotedAudio: false,
	premium: true,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	let STICKER_CMD = JSON.parse(fs.readFileSync('./lib/container/database/sticker.json'))
	     if (order.slice(1) == 'setcmd') {
	            if (!msg.isQuotedSticker) return msg.reply(`Penggunaan : Reply stickernya dan ketik\n*${order} .menu*`)
                let kodenya = msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
                if(getCmd(kodenya)) return msg.reply("Sticker itu sudah terdaftar dalm listcmd dengan isi command : " + getCmd(kodenya))
                if (!q) return msg.reply(`Penggunaan : Reply stickernya dan ketik\n*${order} .menu*`)
                  addCmds(kodenya, q)
                  msg.reply("Done!")
         }
         if (order.slice(1) == 'delcmd') {
	            if (!msg.isQuotedSticker) return msg.reply(`Penggunaan : Reply stickernya dan ketik\n*${order} .menu*`)
                var kodenya = msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
                 STICKER_CMD.splice(getCommandPosition(kodenya), 1)
                 fs.writeFileSync('./lib/container/database/sticker.json', JSON.stringify(STICKER_CMD, null, 2))
                 msg.reply("Done!")
        }
        if (order.slice(1) == 'listcmd') {
            let TXT = `\`\`\`「 LIST STICKER CMD 」\`\`\``
            for (let i of STICKER_CMD) {
               TXT += `\n\n⇨ *ID :* ${i.id}\n⇨ *Cmd* : ${i.chats}`
              }
            await client.sendMessage(from, { text: TXT },{quoted:msg})            
        }
	}
}