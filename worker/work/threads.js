const SETTING = require('../../validator/config')
const fs = require("fs")
const moment = SETTING['modul']['time'];
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const thumb = fs.readFileSync("./lib/container/image/thumb.jpg")


const {
	Threads
} = require('../engine/threads')


let loading = SETTING['message'][5]
let sending = SETTING['message'][6]
let success = SETTING['message'][7]

module.exports = {
	order: ['threads', 'threadsdl', 'threadsvideo', 'threadsdownload', 'threadsnowm'],
	tags: 'downloader',
	command: ['threads'],
	coin: 'threads',
	quoted: 'linknya?',
	quotedUrl: {
		url: 'threads',
		reply: 'Gunakan link threads!'
	},
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	premium: true,
	exec: async (msg, client, from, {
		q,
		args,
		order
	}) => {
		let proces = await client.sendMessage(from, {
			text: loading
		}, {
			quoted: msg
		})
		try {
			Threads(args[0])
				.then(async hasil => {
					let video = hasil["video_versions"]
					let image = hasil["image_versions2"]
					client.editMessage(from, proces.key.id, sending)
					if (video.length == 0) {
						let img = {
							image: {
								url: image[0].url
							},
							caption: 'Title:\n' + hasil.caption ? hasil.caption.text : 'eror',
							contextInfo: {
								externalAdReply: {
									title: time,
									body: `${msg.sayingtime + msg.timoji + ' ' + msg.pushName}`,
									thumbnail: thumb,
									sourceUrl: "https://instagram.com/rifza.p.p",
									mediaUrl: "https://instagram.com/rifza.p.p",
									// renderLargerThumbnail: true,
									showAdAttribution: true,
									mediaType: 1
								}
							}
						}
						await client.sendMessage(from, img, {
							quoted: msg
						})
						client.editMessage(from, proces.key.id, success)
					} else {
						let vid = {
							video: {
								url: video[0].url
							},
							caption: 'Title:\n' + hasil.caption.text,
							contextInfo: {
								externalAdReply: {
									title: time,
									body: `${msg.sayingtime + msg.timoji + ' ' + msg.pushName}`,
									thumbnail: thumb,
									sourceUrl: "https://instagram.com/rifza.p.p",
									mediaUrl: "https://instagram.com/rifza.p.p",
									// renderLargerThumbnail: true,
									showAdAttribution: true,
									mediaType: 1
								}
							}
						}
						await client.sendMessage(from, vid, {
							quoted: msg
						})
						client.editMessage(from, proces.key.id, success)
					}
				})
		} catch (e) {
			msg.reply(`Type error :\n${e}`)
		}
	}
}