const { IMGEnhance } = require("../engine/enhance")
const { TelegraPh } = require('../engine/telegraph')
const fs = require("fs")    
 
module.exports = {
	order: ['enhance','enhancer'],
	tags: 'tools',
	command: ['enhance'],
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
	 let num
	 if(q || !isNaN(q)){
	   if(!(["2","4","6"].includes(q))) return msg.reply(`!Resolution for Enhance scale only: [ 2, 4, 6 ]\nExample: ${order} 2`)
        num = q
     } else { 
        num = 4
     }
     let media = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
     let tph = await TelegraPh(media)
     let enhanced = await IMGEnhance(tph, num)
     
     try{
        client.sendMessage(from, { image: { url: enhanced.url }, caption: `Enhanced to ${num}x resolution`}, { quoted: msg })
     } catch {
       msg.reply("Sending image error!\ntrying to send in document form..... ")
       client.sendMessage(from, { document: enhanced.url, fileName: ranJ, mimetype: 'image/jpeg', caption: 'Result' }, { quoted: msg });
     }
    } catch (e) {
      meg.reply("!Type error:\n" + e)
    }
	}
}