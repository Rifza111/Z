const SETTING = require('../../validator/config')
const modul = SETTING['modul']
const { 
 getRandom
} = require('../../lib/function')
const { spawn, exec } = modul['child'];
const fs = require('fs')

module.exports = {
	order: ['volume'],
	tags: 'tools',
	command: ['volume'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: false, //quotedImage: "pesannya"
	quotedAudio: 'Reply Audionya!', //quotedAudio: "pesannya"
	premium: false, //true/false
	coin: false, //coin: "normal"
	quoted: `Example : #volume 50`, //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
 if(q > 1000) return msg.reply('maksimal 1000!')
 client.sendMessage(from, { react: { text: "⏱️", key: msg.key }})
 let media = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio') 
 ran = getRandom('.mp3')
 exec(`ffmpeg -i ./${media} -filter:a volume=${q} ${ran}`, (err, stderr, stdout) => { 
 fs.unlinkSync(media)
 if (err) return msg.reply('Error!')
 bes = fs.readFileSync(ran)
 client.sendMessage(from, {audio:bes, mimetype: 'audio/mp4', ptt:true}, {quoted: msg})
 fs.unlinkSync(ran)
 })
	}
}