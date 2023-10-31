let {
	chatGPT
} = require('../engine/openai')
module.exports = {
	order: ['gpt', 'ai', 'asisten', 'chatai', 'chatgpt'],
	tags: 'ai',
	command: ['gpt'],	
	quoted: 'Harap sertakan teks yg berisi perintah, pertanyaan, ungkapan, dll...',
	owner: false,
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
		let GPT = await chatGPT(q)
		msg.reply(GPT.data.choices[0].message.content)
	}
}