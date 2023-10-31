const SETTING = require('../../validator/config')
const fs = require("fs")

let loading = SETTING['message'][5]
let sending = SETTING['message'][6]
let success = SETTING['message'][7]


const {
	videoDownloader
} = require('../engine/videodownloader')


module.exports = {
	order: ['downvid','videodownloader', 'videodl'],
	tags: 'downloader',
	command: [ 'videodownloader'],
	quoted: 'linknya?',
	coin: 'normal',	
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,	
	exec: async (msg, client, from, {
		q,
		args,
		order
	}) => {
     let proces = await client.sendMessage(from, { text: loading },{quoted:msg})
		try {
			videoDownloader(args[0])
				.then(async (res) => {									
		             await client.editMessage(from, proces.key.id, sending)					
					let doc = { document: { url: res.media[0].url }, fileName: Math.floor(Math.random() * 100000000000000000) + '.mp4', mimetype: 'video/mp4' }
					await client.sendMessage(from, doc, {
						quoted: msg
					})
	                   client.editMessage(from, proces.key.id, success)
				})
		} catch (e) {
			client.editMessage(from, proces.key.id, `Type-Err! :\n${e}`)
		}
	}
}