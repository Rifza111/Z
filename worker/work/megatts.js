const { mega } = require('../engine/megatts.js')

module.exports = {
	order: ['megatts'],
	tags: 'textospeech',
	command: ['megatts'],
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
	quoted: 'Harap sertakan teksnya!', //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	 try{ 
 let ev = `async function a(){let mg = await require('../engine/megatts.js')['mega'](q); await client.sendMessage(from, { audio: { url: mg.resource_uri[0] }, mimetype: 'audio/mp4', ptt: true}, {quoted: msg})}; a()`
 eval(ev)
	 } catch (e) {
	 msg.reply('TypeErr: ' + e)
	 }
	}
}