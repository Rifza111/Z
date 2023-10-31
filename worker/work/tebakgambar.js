const fs = require("fs")
if (!fs.existsSync('./lib/container/database/game.json')){ fs.writeFileSync('./lib/container/database/game.json', JSON.stringify([], null, 2))}

const { sleep } = require('../../lib/function')

let tebakgambar = JSON.parse(fs.readFileSync('./lib/container/tebakgambar.json'))

module.exports = {
	order: ['tebakgambar'],
	tags: 'game',
	command: ['tebakgambar'],
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
    const deleteGame = async (ID) => {
          global.game.splice(ID, 1)
           fs.writeFileSync("./lib/container/database/game.json", JSON.stringify(global.game, null, 2))
    }
    const addGame = async (ID) => {
          global.game.push(ID)
           fs.writeFileSync("./lib/container/database/game.json", JSON.stringify(global.game, null, 2))
    }
    
         if (global.game.includes(from)) return msg.reply(`*Masih ada permainan yang sedang berlangsung!*\nJika keluhan ini masih ada tetapi game sudah lumayan lama tidak dimainkan, cobalah ketik *${prefix + 'dellgame'}*`)
         await addGame(from)
            let upah = 10000
            let waktu = 60000

            let data = tebakgambar[Math.floor(Math.random() * tebakgambar.length)];
            let jawaban = data["jawaban"]
             console.log(data)
            global._tebakgambar[from.split('@')[0]] = { user: from, jawaban: jawaban.toLowerCase(), time: waktu, coin: upah }  
            client.sendMessage(from, { image: { url: data["img"] }, caption: `*[ TEBAK GAMBAR ]*\n\n*Deskripsi :* ${data["deskripsi"]}\n*Hadiah :* ${upah} coin` + `\n*Waktu :* ${waktu}s\n\n_ketik *nyerah* jika anda tidak sanggup_`}, { quoted: msg })
            await sleep(global._tebakgambar[from.split('@')[0]].time)            
            if (global._tebakgambar.hasOwnProperty(from.split('@')[0])) {
              client.sendMessage(from, { text: 'WAKTU HABIS!\n*Jawaban :* ' + jawaban, mentions: [msg.sender] },{ quoted : msg }) 
              delete global._tebakgambar[from.split('@')[0]]
             deleteGame(from)
            }
           
	}
}