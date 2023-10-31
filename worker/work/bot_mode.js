let SETTING = require('../../validator/config')
module.exports = {
	order: ['mode', 'for'],
	tags: 'owner',
	command: ['mode'],	
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
		if (!args[0]) return msg.reply(" Ex: " + order + " self/public")
		if (args[0] === "self") {
			SETTING['banchats'] = true
			msg.reply(SETTING["mode"][1])
		} else if (args[0] === "public") {
			SETTING['banchats'] = false
			msg.reply(SETTING["mode"][0])
		} else {
			msg.reply(" Ex: " + order + " self/public")
		}
	}
}