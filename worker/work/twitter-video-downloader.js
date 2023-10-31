const url = 'https://www.expertsphp.com/instagram-reels-downloader.php';
const { twitDl } = require('../engine/twit')
module.exports = {
	order: ['twvid','twdl','twitter','twitterdl'],
	tags: 'downloader',
	command: 'twitter',
	coin: 'tiktok',
	quoted: 'Harap sertakan url/link twitter yang berisi video!',
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: { url: 'https://twitter.com', reply: 'Gunakan url video twitter!' },
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
	let tw = await twitDl(q)
      
      client.sendMessage(from, { video: { url: tw[0] }}, { quoted: msg });
	
		
	}
};
