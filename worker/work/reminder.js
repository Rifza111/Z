let parsems = require("parse-ms")
module.exports = {
	order: ['reminder','ingatkan'],
	tags: 'baileys',
	command: ['reminder','ingatkan'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: false,  //quotedImage: "pesannya"
	quotedAudio: false,  //quotedAudio: "pesannya"
	premium: false,  //true/false
	coin: false, //coin: "normal"
	quoted: false, //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	let xfkontak = { key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { "contactMessage":{"displayName": `XM-Multi`,"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:2;;;;\nFN:\nitem1.TEL;waid=00000:00000\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}}
	 let sender = msg.sender
	 let pushname = msg.pushName
	 let text1 = q.split("|")[0]
	 let text2 = q.split("|")[1]
	 let text = "```[ JANGAN LUPA DENGAN JANJI KAMU ]```"
	     text += `\n\nHallo kak ${pushname}, jangan lupa nih`
	     text += `\n\n▪︎ Pesan:\n*${text1}*`
     if(!text2) return msg.reply(`*List:*\ndetik\nmenit\njam\n\n*contoh*\n${order} Makan siang|10 detik`)  
     if(isNaN(parseInt(text2[0]))) return msg.reply(`*List:*\ndetik\nmenit\njam\n\n*contoh*\n${order} Makan siang|10 detik`)  
       let timer;
       if (text2.includes("detik")) {
          timer = parseInt(text2) * 1000
		} else if (text2.includes("menit")) {
		  timer = parseInt(text2) * 60000
		} else if (text2.includes("jam")) {
		  timer = parseInt(text2) * 3600000
		} else if (text2.includes("hari")) {
		  timer = parseInt(text2) * 86400000
		} else {
	      return msg.reply(`*List:*\ndetik\nmenit\njam\nhari\n\n*contoh*\n${order} Makan siang|10 detik`)  
		}

        let m = await parsems(timer)
		msg.reply(`Baik, saya akan mengingatkan anda ${m.days}hari ${m.hours}jam ${m.minutes}menit ${m.seconds}detik ${m.milliseconds}milidetik lagi`)
		setTimeout(async() => {	
		  client.sendMessage(sender, {text: text, mentions:[msg.sender]},{quoted:xfkontak})
		}, timer)
	}
}