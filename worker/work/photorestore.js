const { startTaskPhotoRestore, taskStatus } = require("../engine/photo-restore")
const { TelegraPh } = require('../engine/telegraph')
const fs = require("fs")    
 
module.exports = {
	order: ['photorestore','restorephoto','restore','repair','face_enhance','colorize'],
	tags: 'tools',
	command: ['restorephoto','repair','face_enhance','colorize'],
	maintenance: false,
	coin: "normal",
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
	quotedImage: "Reply imagenya!",
	quotedAudio: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	try{	 
     let media = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
     let tph = await TelegraPh(media)
     let pollingInterval = {};      
     let date = new Date() * 1
     let mess = await client.sendMessage(from, { text: 'Please wait!...' }, { quoted: msg });
     let actions;
     
     if(order.slice(1) == 'repair'){
       actions = [ "repair" ]
     } else if(order.slice(1) == 'colorize'){
       actions = [ "colorize" ]
     } else if(order.slice(1) == 'face_enhance'){
       actions = [ "fe" ]
     } else {
       actions = [
            "repair",
            "colorize",
            "fe"
        ]
     }
     
     const { task_id } = await startTaskPhotoRestore(tph, actions)
       async function checkStatus() {
         const { status, result } = await taskStatus(task_id)
         let text = `Status: _${status}_\nProgres: _${result.progress}%_`
         await client.editMessage(from, mess.key.id, text)
         if(status == "failed") {
           clearInterval(pollingInterval[date]);
           msg.reply("Gagal!, cobalah gambar lain")
           return
         }
         if(status == "done") {
           clearInterval(pollingInterval[date]);
             await client.sendMessage(from, { image: { url: result.output[0] }}, { quoted: msg })
           return
         }     
       }

    const pollingIntervall = 1000;
      pollingInterval[date] = setInterval(checkStatus, pollingIntervall);     
    } catch (e) {
      msg.reply("!Type error:\n" + e)
    }
	}
}
