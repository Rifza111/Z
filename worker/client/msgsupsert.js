const SETTING = require('../../validator/config')
const harga = SETTING['harga']
const modul = SETTING['modul']
const fs = modul['fs'];
const chalk = modul['chalk'];
const util = modul['util'];
const moment = modul['time'];
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const ms = require('parse-ms')
const toMs = require('ms')

let { 
    gameMachine 
} = require("../engine/game")
let { 
    checkPremiumUser
} = require('../../lib/premium')
let { 
    addInventory, 
    checkInventory, 
    addCoin, 
    kurangCoin, 
    getCoin
} = require('../../lib/inventory') 
let {
    default: getContentType,
    generateWAMessageFromContent,
    proto
} = modul['baileys']
let {
    chatUser
} = require('../engine/firstChat')
let {
    color,
    bgcolor
} = require('../../lib/color')

const { 
   spawn, 
   exec
} = modul['child']
const { 
   getBuffer,
   fetchJson
} = require('../../lib/function')
const { 
   checkSCommand, 
   getCmd, 
   addCmds, 
   getCommandPosition 
} = require('../../lib/container/database/sticker.js')


//database
global.queue = new Set()
global.absen = {}
  if (!fs.existsSync('./lib/container/database/mute.json')) {
  	fs.writeFileSync('./lib/container/database/mute.json', JSON.stringify([]))
  }
global.MUTE = JSON.parse(fs.readFileSync('./lib/container/database/mute.json'));
global.USE_CMD = JSON.parse(fs.readFileSync('./lib/container/database/cmd.json'))
global.CO_OWNER = JSON.parse(fs.readFileSync('./lib/container/database/co_owner.json'))
global.USER_PREMIUM = JSON.parse(fs.readFileSync('./lib/container/database/premium.json'));

//game
global.game = JSON.parse(fs.readFileSync('./lib/container/database/game.json'))
global._tebakkata = []
global._tebakgambar = []

const axios = modul['axios'];
const cheerio = modul['cheerio']

const upsert = async (msg, client, from, store) => {
    const textMessage = (msg.xtype === 'conversation') ? msg.message.conversation : (msg.xtype === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
    /*<--------------------( detect )--------------------->*/
    var CMD = (msg.xtype === 'conversation' && msg.message.conversation) ? msg.message.conversation : (msg.xtype == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (msg.xtype == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (msg.xtype == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (msg.xtype == 'buttonsResponseMessage') && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (msg.xtype == 'listResponseMessage') && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (msg.xtype == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId    : (msg.xtype == 'stickerMessage')  && (getCmd(msg.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(msg.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(msg.message.stickerMessage.fileSha256.toString('base64')) : ''
    var prefix = /^[#!.,®©¥€¢£/\∆✓]/.test(CMD) ? CMD.match(/^[#!.,®©¥€¢£/\∆✓]/gi) : '#'
    global.prefix = prefix
    var chatmessage = (msg.xtype === 'conversation' && msg.message.conversation) ? msg.message.conversation : (msg.xtype == 'imageMessage') ? msg.message.imageMessage.caption : (msg.xtype == 'videoMessage') ? msg.message.videoMessage.caption : (msg.xtype == 'extendedTextMessage') ? msg.message.extendedTextMessage.text : (msg.xtype == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : (msg.xtype == 'listResponseMessage') ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (msg.xtype == 'templateButtonReplyMessage') ? msg.message.templateButtonReplyMessage.selectedId : (msg.xtype === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId || msg.text) : ''
    var ordermessage = (msg.xtype === 'conversation' && msg.message.conversation) ? msg.message.conversation : (msg.xtype == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (msg.xtype == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (msg.xtype == 'extendedTextMessage') && msg.message.extendedTextMessage.text.startsWith(prefix) ? msg.message.extendedTextMessage.text : (msg.xtype == 'buttonsResponseMessage') && msg.message.buttonsResponseMessage.selectedButtonId.startsWith(prefix) ? msg.message.buttonsResponseMessage.selectedButtonId : (msg.xtype == 'listResponseMessage') && msg.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (msg.xtype == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId.startsWith(prefix) ? msg.message.templateButtonReplyMessage.selectedId    : (msg.xtype == 'stickerMessage')  && (getCmd(msg.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(msg.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(msg.message.stickerMessage.fileSha256.toString('base64')) : ""
    var chats = (msg.xtype === 'conversation' && msg.message.conversation) ? msg.message.conversation : (msg.xtype == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (msg.xtype == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (msg.xtype == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (msg.xtype == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (msg.xtype == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (msg.xtype == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
    const args = ordermessage.trim().split(/ +/).slice(1)
    const order = ordermessage.slice(0).trim().split(/ +/).shift().toLowerCase()
    const command = ordermessage.slice(1)
    const q = args.join(' ')
    const quoted = msg.quoted ? msg.quoted : msg
    const isCmd = ordermessage.startsWith(prefix)
    const orderPlugins = isCmd ? ordermessage.slice(1).trim().split(/ +/).shift().toLowerCase() : null
    const isGroup = from.endsWith(SETTING['chats'][1])
    const botNumber = client.user.id.split(':')[0] + SETTING['chats'][0]
    const banChats = SETTING['banchats']    
    const isMedia = (msg.xtype === 'imageMessage' || msg.xtype === 'videoMessage' || msg.xtype === 'viewOnceMessageV2')
    const isCoin = getCoin(msg.sender)    
    const isInventory = checkInventory(msg.sender)    
    const myowner = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
    const isOwner = [botNumber, ...global.ownerNumber].map(jid => jid.replace(/[^0-9]/g, '') + SETTING['chats'][0]).includes(myowner)
    const isCoOwner = CO_OWNER.includes(msg.sender)
    const isMute = MUTE.includes(from)
    const isPremium = checkPremiumUser(msg.sender, global.USER_PREMIUM)
    const groupMetdata = isGroup ? await client.groupMetadata(from) : ''
    client.groupMembers = isGroup ? groupMetdata.participants : ''
    client.groupName = isGroup ? await groupMetdata.subject : ''
    client.groupAdmins = isGroup ? msg.getGroupAdmins(client.groupMembers) : ''
    const isBotGroupAdmins = client.groupAdmins.includes(botNumber) || false
    const isGroupAdmins = client.groupAdmins.includes(msg.sender)
     
   /*<--------------------( cmd top )--------------------->*/
   
     client.addCmd = () => {
       USE_CMD.total += 1
       fs.writeFileSync('./lib/container/database/cmd.json', JSON.stringify(USE_CMD, null, 2))	
     }
   
     client.addCMDForTop = (NAMEQ, timw) => {
     try { let cekhN = USE_CMD.cmd.find(i => i.name.includes(NAMEQ))
       if (cekhN) { let cemed = USE_CMD.cmd.find(i => i.name == NAMEQ)
          var ussd = USE_CMD.cmd.indexOf(cemed)
          USE_CMD.cmd[ussd].use += 1;
          USE_CMD.cmd[ussd].times = timw;               
		  fs.writeFileSync('./lib/container/database/cmd.json', JSON.stringify(USE_CMD, null, 2))	
       } else {         
        USE_CMD.cmd.push({ name: NAMEQ, use: 1,  times: timw})
        fs.writeFileSync('./lib/container/database/cmd.json', JSON.stringify(USE_CMD, null, 2))	
      }
      } catch { }
     }    

     client.cmdS = () => {
      return Object.entries(global.USE_CMD.cmd).sort((a, b) => b[1].use - a[1].use);
     };

    client.topCmd = () => {
     const cmdS = client.cmdS();
     const LIST_TOP = cmdS.slice(0, 10).map(([name, data]) => `${prefix}${data.name}(${data.use}) || ${data.times}`);
     return LIST_TOP;
    };

    
    if (!isGroup && chatmessage) {
        client.sendPresenceUpdate('composing', from)
        console.log(bgcolor('[ PRV ]', 'red'), ' > From: ', color(msg.pushName, 'cyan'), ' Conversation: ', color(chatmessage, 'green'))
    }
    if (isGroup) {
        console.log(bgcolor('[ GR ]', 'pink'), ' > From: ', color(from, 'cyan'), ' User: ', color(msg.pushName, 'cyan'), ' Conversation: ', color(chatmessage, 'green'))
    }
    if (isGroup && isMute && !isOwner && !isGroupAdmins) {
       return
    }

   //true = self / false = public
    if (banChats === true) { if(!isOwner && !msg.key.fromMe) return }      
    for  (let name in plugins) {
        let plugin = plugins[name]
        if (plugin.order && plugin.order.includes(orderPlugins)) {
            let turn = plugin.order instanceof Array ?
                plugin.order.includes(orderPlugins) :
                plugin.order instanceof String ?
                plugin.order == orderPlugins :
                false
            if (!turn) continue

              await client.addCMDForTop(order.slice(1), time) 
              await client.addCmd()                      

            if (!isInventory){ await addInventory(msg.sender) }     
            if (plugin.maintenance) {
                msg.reply(`Maaf, Fitur : ${order} sedang dalam pemeliharaan,\nSilahkan coba lain kali ya :(`)
                continue
            }
            if (plugin.owner && !isOwner) {
                msg.reply(SETTING['message'][2])
                continue
            }
            if (plugin.group && !isGroup) {
                msg.reply(SETTING['message'][1])
                continue
            }
            if (plugin.groupAdmins && !isGroupAdmins) {
                msg.reply(SETTING['message'][3])
                continue
            }
            if (plugin.botGroupAdmins && !isBotGroupAdmins) {
                msg.reply(SETTING['message'][4])
                continue
            }
            if (plugin.co_owner && !isCoOwner && !isOwner) {
                msg.reply(SETTING['message'][2])
                continue
            }
            if (plugin.premium && !isPremium && !isOwner) {
                msg.reply(SETTING['message'][9])
                continue
            }
            if (plugin.quotedSticker && !msg.isQuotedSticker){
               msg.reply(plugin.quotedSticker)
               continue
            }
            if (plugin.quotedStickerVideo && !msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage.isAnimated == true){
               msg.reply(plugin.quotedStickerVideo)
               continue
            }
            if (plugin.quotedVideo && !msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage){
               msg.reply(plugin.quotedVideo)
               continue
            }  
            if (plugin.quotedImage && !msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage){
               msg.reply(plugin.quotedImage)
               continue
            } 
            if (plugin.quotedAudio && !msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage){
               msg.reply(plugin.quotedAudio)
               continue
            }               
            if (plugin.quoted && !q) {
               msg.reply(plugin.quoted)
               continue
            }
            if (plugin.quotedUrl && !q.includes(plugin.quotedUrl.url)){
              msg.reply(plugin.quotedUrl.reply)
              continue
            }    
            
            if (plugin.coin && !isPremium) {       
                 let _harga = harga[plugin.coin]
               if (isCoin < _harga) {
                  return msg.reply(`Coin kamu tidak mencukupi untuk melakukan tindakan ini!\n • Coin tersisa: 🪙${isCoin} \n • Membutuhkan: 🪙${_harga}\n\n_Untuk mendapatkan koin, kamu bisa meminta teman untuk mentransfer coin ke kamu_\n -> .transfer 628********** jumlah`);
               }

               await kurangCoin(msg.sender, parseInt(_harga));
               msg.reply(`-${_harga} 🪙coin`);
            }

            
            await plugin.exec(msg, client, from, {
                q,
                args,
                order,
                prefix,
                isMedia
            })
            
              
        }
    }    
    
    /*<--------------------( game )--------------------->*/        

       gameMachine(client, chatmessage, msg, from, isCmd)

    /*<--------------------( game )--------------------->*/        

    /*<--------------------( eval )--------------------->*/         
       if (chatmessage.startsWith('=>')) {
        if (!isOwner && !isCoOwner) return 
         function Return(sul) {
         sat = JSON.stringify(sul, null, 2)
         bang = util.format(sat)
         if (sat == undefined) {
            bang = util.format(sul)
          }
          return msg.reply(bang)
         }
        try {
         msg.reply(util.format(eval(`(async () => { ${chatmessage.slice(3)} })()`)))
        } catch (e) {
         msg.reply(String(e))
        }
          }       
      if (chatmessage.startsWith('>')) {
       if (!isOwner && !isCoOwner) return 
        try {
          let evaled = await eval(chatmessage.slice(2))
           if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
           await msg.reply(evaled)
         } catch (err) {
           msg.reply(String(err))
        }
       }
     if (chatmessage.startsWith('$')) {
       if (!isOwner) return 
        exec(chatmessage.slice(2), (err, stdout) => {
       if(err) return client.sendMessage(from, {text :String(err)}, {quoted:msg})
       if (stdout) return msg.reply(stdout)
       })
     } 
     
    if(msg.message && !msg.key.fromMe && !isCmd && from.endsWith(SETTING['chats'][0]) && !msg.isBaileys){     
      setTimeout(()=> { chatUser(from, msg, client) }, 1000)
    }      
}
module.exports = upsert
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.red(`New ${__filename}`))
    delete require.cache[file]
    require(file)
})