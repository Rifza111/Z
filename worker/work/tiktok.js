const { tiktokDl } = require('../engine/tiktokdl')

module.exports = {
	order: ['tiktok','tt','tiktokdl','tiktokslide','tiktoknowm','tiktokvid','ttdl'],
	tags: 'downloader',
	command: ['tiktok'],
	maintenance: false,
	coin: false,
	quoted: 'linknya?',
	quotedUrl: {
		url: 'tiktok',
		reply: 'Gunakan link tiktok!'
	},
	quotedSticker: false,
	quotedStickerVideo: false,	
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	quotedImage: false,
	quotedAudio: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {

	let data = await tiktokDl(q)
	let type = data.type
	let text = '[ TIKTOK DOWNLOAD ]' + '\n\n'
    	text += `type: ${type}`+'\n'
        text += `name: ${data.name}`+'\n'
        text += `username: ${data.username}`+'\n'
        text += `profile: ${data.profile}`+ '\n'
        text += `views: ${data.views}`+ '\n'
        text += `likes: ${data.likes}`+ '\n'
        text += `comments: ${data.comments}`+ '\n'
        text += `favorite: ${data.favorite}`+ '\n'
        text += `shares: ${data.shares}`+ '\n'
        text += `description: ${data.description}`+ '\n\n'       
    let proces = await client.sendMessage(from, {
			text: 'Media type : ' + type
		}, {
			quoted: msg
		}) 
    if(type == 'image'){     
     let images = data.image     	            
     await client.editMessage(from, proces.key.id, text + `*Please wait.....*`)
     for (let N = 0; N < images.length; N++) {
        await client.sendMessage(from, { image: { url: images[N] }, caption: 'images: ' + (N + 1)}, { quoted: msg })
     }
    }
    if(type == 'video'){
     let video = data.video['no-watermark']
     client.sendMessage(from, { video: { url: video }, caption: text }, { quoted: msg })
    } 
	}
}