let stalker = require("../engine/stalker.js")
let { github } = new stalker

module.exports = {
	order: ['githubstalk', 'ghstalk', 'stalkgh', 'githubstalker'],
	tags: 'stalker',
	command: ['githubstalk'],
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
	quoted: "Sertakan username akun github yg akan di stalk!", //quoted: "pesannya"
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
 	let { name, login, id, following, followers, created_at, updated_at, avatar_url, html_url }= await github(q)
 	
 	let teks = `*[ GITHUB STALKER ]*\n\n`
 	 teks += `📝Name : ${name}\n`
 	 teks += `📋nick : ${login}\n`
 	 teks += `📋id : ${id}\n`
 	 teks += `💙following : ${following}\n`
 	 teks += `👥followers : ${followers}\n`
 	 teks += `📖created : ${created_at}\n`
 	 teks += `⬆️update : ${updated_at}\n`
 	client.sendMessage(from, { text: teks, contextInfo: {
 externalAdReply: {
 title: `${msg.sayingtime + msg.timoji + ' ' + msg.pushName}`,
 body: `TopCMD ⇨ '${prefix + client.cmdS()[0][1]['name']}', use: '${client.cmdS()[0][1]['use']}', times: '${client.cmdS()[0][1]['times']}'`,
 thumbnailUrl: avatar_url,
 sourceUrl: html_url,
 mediaUrl: html_url,
 renderLargerThumbnail: true,
 showAdAttribution: true,
 mediaType: 1,
 }
 }
 },
 { quoted: msg })
	 } catch {
	 msg.reply("Error! atau username tidak ditemukan!")
	 }
	}
}