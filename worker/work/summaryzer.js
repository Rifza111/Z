const SETTING = require('../../validator/config')
const { summary } = require('../engine/summary')

module.exports = {
	order: ['ringkas','rangkum','summaryzer','summary'],
	tags: 'tools',
	command: ['ringkas'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: false, //quotedImage: "pesannya"
	quotedAudio: false, //quotedAudio: "pesannya"
	premium: false, //true/false
	coin: false, //coin: "normal"
	quoted: false,
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	let name = SETTING["botName"]
	let quoted = { key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { "contactMessage":{"displayName": `${name}`,"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:2;katame;;;\nFN:katame\nitem1.TEL;waid=00000:00000\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}}
         
	let text
	if(msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.extendedTextMessage?.text){
	    text = msg.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.text
	} else if(msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.conversation){
	    text = msg.message.extendedTextMessage.contextInfo.quotedMessage.conversation
	} else if(q){
	    text = q
	} else { 
    	return msg.reply(`Reply pesan atau Sertakan materi, cerita, atau teks lainnya untuk di ringkas!\n\nExample: \n_${order} teksnya_\n_${order} <reply pesannya>`)
    }
	 let summaryzer = await summary(text)
	 client.sendMessage(from, { text: summaryzer.response }, { quoted:quoted })
	}
}