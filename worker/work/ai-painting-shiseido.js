// ○ Create by @rifza.p.p
  const fs = require('fs')
 const https = require('https')
 const axios = require('axios');
   let httpsAgent = new https.Agent({
     rejectUnauthorized: false,
  })
 const { v4 } = require('uuid')
//aiplay_ai_painting_graduate_s2_entry
 const md5 = require('md5')
 let url = 'https://ai.tu.qq.com/overseas/trpc.shadow_cv.ai_processor_cgi.AIProcessorCgi/Process';// ○ Create by @rifza.p.p


module.exports = {
	order: ['shiseido','aiimage','aiimg'],
	tags: 'ai',
	command: 'shiseido',
	coin: false,
	quoted: false,
	quotedSticker: false,
	maintenance: true,
	quotedStickerVideo: false,
	quotedUrl: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	quotedImage: 'Reply imagenya!',
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	msg.reply("Processing....")
    let getImgMsg = msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;// ○ Create by @rifza.p.p
	let media = await client.downloadMediaMessage(getImgMsg, 'image');
   const signV1 = (obj) => {
    const str = JSON.stringify(obj);
     return md5(
        'https://h5.tu.qq.com' +
        (str.length + (encodeURIComponent(str).match(/%[89ABab]/g)?.length || 0)) +
        'HQ31X02e',
     );
   };

    const obj = {
      busiId: 'ai_painting_shiseido_entry',
                extra: JSON.stringify({
                   face_rects: [],
                   version: 2,
                   language: "en",
                   platform: "web",
                   uuid: v4(),
                   uuid_for_sentence: v4(),
                   data_report: {
                   parent_trace_id: v4(),
                   root_channel: "",
                   level: 0
                  }
      }),                   
        images: [""+media.toString("base64")],
    };

    let sign = await signV1(obj)
    
    let xyos = await axios.request({              
               httpsAgent,     
               method: 'POST',
               url,
               data: obj,
               headers: {
                 'Content-Type': 'application/json',
                 'Origin': 'https://h5.tu.qq.com',
                 'Referer': 'https://h5.tu.qq.com/',
                 'User-Agent': "Mozilla/5.0 (Linux; Android 7.1.1; CPH1801) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",// ○ Create by @rifza.p.p
                 'x-sign-value': sign,
                 'x-sign-version': 'v1',
               },
        timeout: 30000,
       })
       .catch((e) => console.log(e))          
         if(xyos.data.code == 0) {
         let buff = new Buffer.from(xyos.data.images[0], 'base64')
         client.sendMessage(from, { image: buff, caption: "Result" },{ quoted: msg })
       } else {
      msg.reply(`Please try again later!\nTypeError:\n${xyos.data.msg}`)// ○ Create by rifza.p.p
    }

	}
}
// ○ Create by @rifza.p.p