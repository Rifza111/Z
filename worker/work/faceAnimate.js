const { startTaskFaceAnimate, getFacePosition, taskStatus } = require("../engine/faceanimate")
const { TelegraPh } = require('../engine/telegraph')
const { gifToMp4 } = require('../engine/giftomp4')
const fs = require("fs")    
 
module.exports = {
	order: ['faceanimated','faceanimate','animateface'],
	tags: 'tools',
	command: ['faceanimate'],
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

     let { faces } = await getFacePosition(tph)
     const { task_id } = await startTaskFaceAnimate(tph, faces)
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
           let tomp4 = await gifToMp4(result.output)
             await client.sendMessage(from, { video: { url: tomp4 }, mimetype: "video/mp4", gifPlayback: true}, { quoted: msg })
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
