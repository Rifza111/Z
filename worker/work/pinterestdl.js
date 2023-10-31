const SETTING = require('../../validator/config')
const {
	Download
} = require('../engine/download')
const { sleep } = require('../../lib/function')

let loading = SETTING['message'][5]
let sending = SETTING['message'][6]
let success = SETTING['message'][7]

module.exports = {
	order: ['pinterestdl'],
	tags: 'downloader',
	command: [ 'pinterestdl'],
	quoted: 'linknya?',
	coin: 'normal',
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: { url: 'http', reply: 'Gunakan link!!' },
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
	await sleep(1000)
	 let proces = await client.sendMessage(from, { text: loading },{quoted:msg})
 try{
	 let tool = await Download(q)
 let aud = { video: { url: tool.mp4[0].url }, mimetype: 'video/mp4', caption: tool.title }
 await client.editMessage(from, proces.key.id, sending)	
 await client.sendMessage(from, aud, { quoted : msg })
 client.editMessage(from, proces.key.id, success)
 } catch(e) { client.editMessage(from, proces.key.id, `Type-Err! :\n${e}`) }
 
	}
}