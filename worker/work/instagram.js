const { saveInsta } = require("../engine/saveinsta")
module.exports = {
	order: ['igdl', 'ig', 'instagramdl','instagram','instagramdownload'],
	tags: 'downloader',
	command: ['igdl'],
	maintenance: false,
	coin: 'normal',
	quoted: 'Harap sertakan link instagram!',
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: {
		url: 'instagram',
		reply: 'Gunakan link instagram!'
	},
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
	let { medias } = await saveInsta(q)
      for (let N = 0; N < medias.length; N++) {
        let type = medias[N].type
        if(type == 'image'){
          await client.sendMessage(from, { image: { url: medias[N].url }, caption: 'Media : ' + (N + 1) }, { quoted: msg })
        }  
        if(type == 'video') {
          await client.sendMessage(from, { video: { url: medias[N].url }, caption: 'Media : ' + (N + 1) }, { quoted: msg })
        }
      } 
	}
}