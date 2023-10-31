const fs = require("fs")

const {
	addInventory,
	checkInventory,
	addCoin,
	kurangCoin,
	getCoin
} = require('../../lib/inventory');

exports.gameMachine = async (client, chatmessage, msg, from, isCmd) => {
    const deleteGame = async (ID) => {
          global.game.splice(ID, 1)
            fs.writeFileSync("./lib/container/database/game.json", JSON.stringify(global.game, null, 2))
    }
    
    //--------------------[ TEBAK KATA ]--------------------\\
     if (!msg.isBaileys && global.game.includes(from) && global._tebakkata.hasOwnProperty(from.split('@')[0]) && chatmessage && !isCmd && !msg.key.fromMe) {
     let jawaban = global._tebakkata[from.split('@')[0]].jawaban      
        if (chatmessage.toLowerCase().includes(jawaban)) {  
       addCoin(msg.sender, global._tebakkata[from.split('@')[0]].coin)
       msg.reply(`Selamat jawaban kamu benar🥳🎉\n\n[🎁]Kamu mendapatkan hadiah sebanyak ${global._tebakkata[from.split('@')[0]].coin} coin\n\nTotal coin kamu: ${getCoin(msg.sender)}`)
          delete global._tebakkata[from.split('@')[0]]
           fs.writeFileSync("./lib/container/database/tebakkata.json", JSON.stringify(global._tebakkata, null, 2))
         setTimeout(async() => { await deleteGame(from) },1000)
        } else if(chatmessage == 'nyerah'){
          client.sendMessage(from, { text: 'Anda menyerah, game dibatalkan!\n*Jawaban :* ' + jawaban, mentions: [msg.sender] },{ quoted : msg }) 
          delete global._tebakkata[from.split('@')[0]]
           fs.writeFileSync("./lib/container/database/tebakkata.json", JSON.stringify(global._tebakkata, null, 2))
           setTimeout(async() => { await deleteGame(from) },1000)
        } else {
        msg.reply("Jawaban Salah!")
       }
     }
     
    //--------------------[ TEBAK GAMBAR ]--------------------\\
     if (!msg.isBaileys && global.game.includes(from) && global._tebakgambar.hasOwnProperty(from.split('@')[0]) && !isCmd && chatmessage && !msg.key.fromMe) {
     let jawaban = global._tebakgambar[from.split('@')[0]].jawaban
        if (chatmessage.toLowerCase().includes(jawaban)) {  
       addCoin(msg.sender, global._tebakgambar[from.split('@')[0]].coin)
       msg.reply(`Selamat jawaban kamu benar🥳🎉\n\n[🎁]Kamu mendapatkan hadiah sebanyak ${global._tebakgambar[from.split('@')[0]].coin} coin\n\nTotal coin kamu: ${getCoin(msg.sender)}`)
          delete global._tebakgambar[from.split('@')[0]]
         setTimeout(async() => { await deleteGame(from) },1000)
        } else if(chatmessage == 'nyerah'){
          client.sendMessage(from, { text: 'Anda menyerah, game dibatalkan!\n*Jawaban :* ' + jawaban, mentions: [msg.sender] },{ quoted : msg }) 
          delete global._tebakgambar[from.split('@')[0]]
           setTimeout(async() => { await deleteGame(from) },1000)
        } else {
        msg.reply("Jawaban Salah!")
       }
     }              

}