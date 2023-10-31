let SETTING = require('../../validator/config')
const fs = require("fs")

module.exports = {
	order: ['delcoowner'],
	owner: true,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
		if (args[0]) {
			if (isNaN(q)) return msg.reply('Nomor target Harus berupa angka!')
			let ment1 = q.replace(/[+ -]/g, "") + SETTING['chats'][0]
			if (!global.CO_OWNER.includes(ment1)) return msg.reply(`${ment1} BUKAN CO_OWNER❗`)
			global.CO_OWNER.splice(ment1)
			fs.writeFileSync('./lib/container/database/co_owner.json', JSON.stringify(global.CO_OWNER, null, 2))
			msg.reply('Sukses memghapus nomor : ' + ment1 + ' dari co_owner')
		} else if (msg.message.extendedTextMessage?.contextInfo?.participant) {
			let ment2 = msg.message.extendedTextMessage?.contextInfo?.participant
			if (!global.CO_OWNER.includes(ment2)) return msg.reply(`${ment2} BUKAN CO_OWNER❗`)
			global.CO_OWNER.splice(ment2)
			fs.writeFileSync('./lib/container/database/co_owner.json', JSON.stringify(global.CO_OWNER, null, 2))
			msg.reply('Sukses menghapus nomor : ' + ment2 + ' dari co_owner')
		} else {
			msg.reply('Sertakan nomornya! atau reply/tag user yang akan di hapus dari co_owner!!')
		}

	}
}