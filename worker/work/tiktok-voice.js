const {
	tiktokVoice
} = require('../engine/tiktokvoice')
const { getRandom } = require('../../lib/function')

module.exports = {
	order: ['tiktoktts','tiktokvoice'],
	tags: 'tools',
	command: 'tiktokvoice',
	coin: false,
	quoted: 'Contoh : $<command> Hallo saya zefry',
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	let audio = await tiktokVoice(q)
	let media = q.split("|")[1]
	let randomName = getRandom('.mp3')
	if(media == 'mp3'){
	 	client.sendMessage(from, { document: audio, fileName: randomName, mimetype: 'audio/mp3'},{quoted:msg})
    } else if(media == 'm4a'){
    	client.sendMessage(from, { audio: audio, mimetype: 'audio/mp4'},{quoted:msg})    
    } else { 
    	client.sendMessage(from, { audio: audio, ptt: true, mimetype: 'audio/mp4'},{quoted:msg})
    }
	}
}