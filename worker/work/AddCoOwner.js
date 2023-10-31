let SETTING = require('../../validator/config')
const fs = require("fs")

module.exports = {
	order: ['addcoowner'],
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
			if (global.CO_OWNER.includes(ment1)) return msg.reply(`${ment1} SUDAH JADI CO_OWNER❗`)
			global.CO_OWNER.push(ment1)
			fs.writeFileSync('./lib/container/database/co_owner.json', JSON.stringify(global.CO_OWNER, null, 2))
			msg.reply('Sukses menjadikan nomor : ' + ment1 + ' sebagai co_owner')
		} else if (msg.message.extendedTextMessage?.contextInfo?.participant) {
			let ment2 = msg.message.extendedTextMessage?.contextInfo?.participant
			if (global.CO_OWNER.includes(ment2)) return msg.reply(`${ment2} SUDAH JADI CO_OWNER❗`)
			global.CO_OWNER.push(ment2)
			fs.writeFileSync('./lib/container/database/co_owner.json', JSON.stringify(global.CO_OWNER, null, 2))
			msg.reply('Sukses menjadikan nomor : ' + ment2 + ' sebagai co_owner')
		} else {
			msg.reply('Sertakan nomornya! atau reply user yang akan di jadikan co_owner!!')
		}

	}
}