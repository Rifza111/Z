const axios = require("axios")
module.exports = {
	order: ['transcribe','audiototext','whisper'],
	tags: 'ai',
	command: ['transcribe'],
	coin: false,
	quoted: false,
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	quotedImage: false,
	quotedAudio: 'Reply audionya!',
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
    let buffer = await client.downloadMediaMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')  
	   try {
         let response = await axios.post('https://whisper-event-whisper-demo.hf.space/run/predict', {
           "fn_index": 0,
           "data": [
             {
               "data": "data:audio/mp3," + buffer.toString('base64'),
               "name": "audio"
             },
             null
           ],
           "session_hash": "vjlc6fbhkpi"
         });
         msg.reply(response.data.data[0]);
       } catch (e) {
      msg.reply(e +'');
    }
  }
}