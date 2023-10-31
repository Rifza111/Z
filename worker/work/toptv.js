module.exports = {
	order: ['ptv','toptv'],
	tags: 'baileys',
	command: [ 'toptv'],
	quotedVideo: "Reply videonya!",
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
	
	client.relayMessage(from, { ptvMessage: msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage }, {})
	
	}
}