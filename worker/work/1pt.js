const { fetchJson } = require('../../lib/function');
let SETTING = require('../../validator/config')

module.exports = {
	order: ['1pt'],
	tags: 'shorturl',
	command: ['1pt'],
	coin: 'normal',
	quoted: 'Example : #<command> https://instagram.com/rifza.p.p|rifza\n\n```Jika custom url sudah ada, maka akan dibuat secara acak```' ,
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
         let text1 = q.split("|")[0]	     
         let text2 = q.split("|")[1]
         if(!text2) return msg.reply(`Example : ${order} https://instagram.com/rifza.p.p|rifza\n_Maka hasilnya adalah :_ https://1pt.co/rifza\n\n${'```Jika custom url sudah ada, maka akan dibuat secara acak```'}`)                  
         let custom = await fetchJson('https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url='+text1+'&cu='+text2)
         let TEXT = '```STATUS: ```' + custom.status + '\n```YOUR-URL: ```' + custom.long + '\n```RESULT: ```' + 'https://1pt.co/' + custom.short + `\n\n${SETTING['botName']}`
         msg.reply(TEXT)

	}
}