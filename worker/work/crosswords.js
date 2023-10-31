const {
	crosswords
} = require('../engine/crosswords')
const fs = require('fs')
const {
	getRandom
} = require('../../lib/function')

module.exports = {
	order: ['crossword', 'ttsmaker'],
	tags: 'maker',
	command: ['ttsmaker'],	
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

		if (!q) return msg.reply('Harap sertakan teks!')
		if (!q.includes('|')) return msg.reply('berikan | untuk membatasi jawaban!')
		if (q.includes(" ")) return msg.reply('Jangan beri jarak!')

		let tx = q.replace(/[|]/g, '\n')
		let cross = await crosswords(tx)

		client.sendMessage(from, {
			image: {
				url: cross.hide_answers
			},
			caption: 'Result',
		}, {
			quoted: msg
		})


	}
}