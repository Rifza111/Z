const {
    getContentType,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessage,
    generateWAMessageFromContent,
    proto
} = require('@whiskeysockets/baileys')
const {
    exec
} = require("child_process")
const fs = require('fs')
const jimp = require('jimp')
const chalk = require('chalk')
const axios = require('axios')
const FileType = require('file-type')
const {
    getRandom,
    getBuffer
} = require('./function.js')
//JSON.stringify(data)
const thumb = fs.readFileSync("./lib/container/image/thumb.jpg")
const moment = require("moment-timezone")
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')

module.exports = async (client, msg, store) => {
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
    let morph = msg
    const from = morph.key.remoteJid
    if (!msg) return msg
    if (morph.key) {
        ID = msg.key.id
        msg.isBaileys = ID.startsWith('BAE5') && ID.length === 16
        msg.sender = client.decodeJid(msg.Me && client.user.id || msg.participant || msg.key.participant || msg.key.remoteJid || '')
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//    
    if (msg.message) {
        msg.msgType = Object.keys(msg.message)[0]
        msg.xtype = getContentType(msg.message)
        msg.isMedia = (msg.xtype === 'imageMessage' || msg.xtype === 'videoMessage')
        msg.content = JSON.stringify(msg.message)
        msg.isQuotedImage = msg.xtype === 'extendedTextMessage' && msg.content.includes('imageMessage')
        msg.isQuotedVideo = msg.xtype === 'extendedTextMessage' && msg.content.includes('videoMessage')
        msg.isQuotedAudio = msg.xtype === 'extendedTextMessage' && msg.content.includes('audioMessage')
        msg.isQuotedSticker = msg.xtype === 'extendedTextMessage' && msg.content.includes('stickerMessage')
        msg.isQuotedTag = msg.xtype === 'extendedTextMessage' && msg.content.includes('mentionedJid')
        msg.isQuotedReply = msg.xtype === 'extendedTextMessage' && msg.content.includes('Message')
        msg.isQuotedLocation = msg.xtype === 'extendedTextMessage' && msg.content.includes('locationMessage')
        msg.msg = (msg.xtype == 'viewOnceMessage' ? msg.message[msg.xtype].message[getContentType(msg.message[msg.xtype].message)] : msg.message[msg.xtype])
        if (msg.msg) {
            let quoted = msg.quoted = msg.msg.contextInfo ? msg.msg.contextInfo.quotedMessage : null
            if (msg.quoted) {
                let type = getContentType(quoted)
                if (['productMessage'].includes(type)) {
                    type = getContentType(msg.quoted)
                    msg.quoted = msg.quoted[type]
                }
                if (typeof msg.quoted === 'string') msg.quoted = {
                    text: msg.quoted
                }
                try {
                    const context = msg.message[msg.xtype].contextInfo.quotedMessage
                    if (context["ephemeralMessage"]) {
                        msg.quotedMsg = context.ephemeralMessage.message
                    } else {
                        msg.quotedMsg = context
                    }
                    msg.isQuotedMsg = true
                    msg.quotedMsg.sender = msg.message[msg.xtype].contextInfo.participant
                    msg.quotedMsg.fromMe = msg.quotedMsg.sender === conn.user.id.split(':')[0] + '@s.whatsapp.net' ? true : false
                    msg.quotedMsg.type = Object.keys(msg.quotedMsg)[0]
                    let ane = msg.quotedMsg
                    msg.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : (ane.type == 'buttonsMessage') && ane.buttonsMessage.contentText ? ane.buttonsMessage.contentText : ""
                    msg.quotedMsg.id = msg.message[msg.xtype].contextInfo.stanzaId
                } catch {
                    msg.quotedMsg = null
                    msg.isQuotedMsg = false
                }
                //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//    
                msg.quoted.id = msg.msg.contextInfo.stanzaId
                msg.quoted.chat = msg.msg.contextInfo.remoteJid || msg.chat
                msg.quoted.isBaileys = msg.quoted.id ? msg.quoted.id.startsWith('BAE5') && msg.quoted.id.length === 16 : false
                msg.quoted.sender = client.decodeJid(msg.msg.contextInfo.participant)
                msg.quoted.fromMe = msg.quoted.sender === (client.user && client.user.id)
                msg.quoted.text = msg.quoted.text || msg.quoted.caption || msg.quoted.conversation || msg.quoted.contentText || msg.quoted.selectedDisplayText || msg.quoted.title || ''
                msg.quoted.mentionedJid = msg.msg.contextInfo ? msg.msg.contextInfo.mentionedJid : []
            }
        }
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//  
    msg.getGroupMembers = function(participants) {
        let adminz = []
        for (let i of participants) {
            i.id !== null ? adminz.push(i.id) : ''
        }
        return adminz
    }
    msg.getGroupAdmins = function(participants) {
        let admins = []
        for (let i of participants) {
            i.admin !== null ? admins.push(i.id) : ''
        }
        return admins
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*// 
  client.copyMSGForward = async (ID, messg, forceForward = false, options = {}) => {
    let zType
     if (options.readViewOnce) {
       messg.message = messg.message && messg.message.ephemeralMessage && messg.message.ephemeralMessage.message ? messg.message.ephemeralMessage.message : (messg.message || undefined)
       zType = Object.keys(messg.message.viewOnceMessageV2.message)[0]
        delete(messg.message && messg.message.ignore ? messg.message.ignore : (messg.message || undefined))
        delete messg.message.viewOnceMessageV2.message[zType].viewOnce
        messg.message = {
           ...messg.message.viewOnceMessageV2.message
         }
      }
    let vType = Object.keys(messg.message)[0]
    let content = await generateForwardMessageContent(messg, forceForward)
    let xType = Object.keys(content)[0]
    let context = {}
    if (vType != "conversation") context = messg.message[vType].contextInfo
        content[xType].contextInfo = {
         ...context,
         ...content[xType].contextInfo
       }
    const WAMessaGE = await generateWAMessageFromContent(ID, content, options ? {
     ...content[xType],
     ...options,
     ...(options.contextInfo ? {
         contextInfo: {
           ...content[xType].contextInfo,
           ...options.contextInfo
          }
       } : {})
     } : {})
   await client.relayMessage(ID, WAMessaGE.message, { messageId:  WAMessaGE.key.id })
   return WAMessaGE
  }
    msg.reply = async (teks) => {
        client.sendMessage(from, {
            text: teks,
            mentions: [msg.sender]
        }, {
            quoted: msg
        })
    }
    client.sendButtonImage = async (ID, coma, TXT, optsimg, caption, footer, quoted) => {
        let buttons = [{
            buttonId: `${coma}`,
            buttonText: {
                displayText: TXT
            },
            type: 1
        }, ]
        let buttonMessage = {
            image: optsimg,
            caption: caption,
            footer: footer,
            buttons: buttons,
            headerType: 4
        }
        await client.sendMessage(from, buttonMessage, quoted)
    }
    client.fpay = () => {
        xtol = {
            key: {
                remoteJid: '0@s.whatsapp.net',
                fromMe: false,
                id: '🔥፝⃟ ꙳ZAFRI🔥፝⃟ ',
                participant: '0@s.whatsapp.net'
            },
            message: {
                requestPaymentMessage: {
                    currencyCodeIso4217: "USD",
                    amount1000: 9999999,
                    requestFrom: (msg !== null && msg !== undefined) ? msg.sender : '0@s.whatsapp.net',
                    noteMessage: {
                        extendedTextMessage: {
                            text: (msg !== null && msg !== undefined) ? msg.text : 'Xilver-Moods WhatsApp Bot'
                        }
                    },
                    expiryTimestamp: 999999,
                    amount: {
                        value: 91929291929,
                        offset: 5000,
                        currencyCode: "USD"
                    }
                }
            }
        }
        return xtol
    }
    
    msg.fkontak = (from) => { 
      xfkontak = { key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { "contactMessage":{"displayName": `XM-Multi`,"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:2;katame;;;\nFN:katame\nitem1.TEL;waid=00000:00000\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}}
      return xfkontak
    }
    
    msg.downvideo = async (file) => {
     let vid = {
                  document: await getBuffer(file),    
                   fileName: `${file + '.mp4'}`,
                   mimetype: 'video/mp4',
                   contextInfo:{
                     externalAdReply:{
                       title: time,
                       body: `${msg.sayingtime + msg.timoji + ' ' + msg.pushName}`,
                       thumbnail: thumb,
                       sourceUrl: "https://instagram.com/rifza.p.p",
                       mediaUrl: "https://instagram.com/rifza.p.p",
                       //renderLargerThumbnail: true,
                       showAdAttribution: true,
                       mediaType: 1
                      }
                    }
                 }
                   client.sendMessage(from, vid, { quoted : msg.fkontak(from) })

    }
    
    client.editMessage = async(idmsg, keymsg, editedmsg) => {
         prex = generateWAMessageFromContent(idmsg, proto.Message.fromObject(
        {
          "editedMessage":
          {
            "message":
            {
                "protocolMessage":{
                 "key":{
                  "remoteJid":idmsg,
                  "fromMe":true,
                  "id":keymsg
                 },
                  "type":"MESSAGE_EDIT",
                  "editedMessage":{
                  "conversation": editedmsg
                  }
              }
            }
          }
        }),
        {
          userJid: idmsg,
          quoted: msg
        })
        client.relayMessage(idmsg, prex.message,
        {
          messageId: prex.key.id
        })
    }

 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
  const times = moment().tz('Asia/Jakarta').format('HH:mm:ss')
      
  if(times < "23:59:00"){
    msg.sayingtime = 'Good night'
    msg.timoji = '🌃'}
  if(times < "19:00:00"){
    msg.sayingtime  = 'Good night'
    msg.timoji = '🏙️'}
  if(times < "18:00:00"){
    msg.sayingtime = 'Good afternoon'
    msg.timoji = '🌇'}
  if(times < "15:00:00"){
    msg.sayingtime = 'Good afternoon'
    msg.timoji = '🌞'}
  if(times < "11:00:00"){
    msg.sayingtime = 'Good morning'
    msg.timoji = '🌅'}
  if(times < "05:00:00"){
    msg.sayingtime = 'Good night'
    msg.timoji = '🌃' }      
    

    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
    msg.speech = (id, teks, teks2) => { //original function by @rifza.p.p		
        let gttsp = require('../worker/engine/gtts.js')(teks)
        let heh = teks2
        let ranm = getRandom('.mp3')
        let rano = getRandom('.ogg')
        gttsp.save(ranm, heh, function() {
            exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
                fs.unlinkSync(ranm)
                let buff = fs.readFileSync(rano)
                let aud = {
                    audio: buff,
                    ptt: true,
                    mimetype: 'audio/mp4',
                    duration: 32668,
                    contextInfo: {
                        externalAdReply: {
                            title: time,
                            body: `${msg.sayingtime + msg.timoji + ' ' + msg.pushName}`,
                            thumbnail: thumb,
                            sourceUrl: "https://instagram.com/rifza.p.p",
                            mediaUrl: "https://instagram.com/rifza.p.p",
                            //renderLargerThumbnail: true,
                            //showAdAttribution: true,
                            mediaType: 1
                        }
                    }
                }
                client.sendMessage(id, aud, {
                    quoted: msg
                })
                fs.unlinkSync(rano)
            })
        })
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                          
    client.typeMediaUrl = async (url) => {
        let mime = '';
        let res = await axios.head(url)
        mime = res.headers['content-type']
        console.log(mime)
        if (mime.split("/")[1] === "gif") {
            return `video`
        }
        if (mime === "application/pdf") {
            return `document`
        }
        if (mime.split("/")[0] === "image") {
            return `image`
        }
        if (mime.split("/")[0] === "video") {
            return `video`
        }
        if (mime.split("/")[0] === "audio") {
            return `audio`
        }
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//   
    client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
    client.downloadMediaMessage = async (message, MessageType) => {
        const stream = await downloadContentFromMessage(message, MessageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                   
    client.generateProfilePicture = async (buffer) => {
        const jimpread = await jimp.read(buffer);
        const result = jimpread.getWidth() > jimpread.getHeight() ? jimpread.resize(550, jimp.AUTO) : jimpread.resize(jimp.AUTO, 650)
        let jump = await jimp.read(await result.getBufferAsync(jimp.MIME_JPEG));
        return {
            bufferzzz: await result.getBufferAsync(jimp.MIME_JPEG)
        }
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                                          
    msg.sequestrar = async (arg, participants, jumlah) => {//original function by @rifza.p.p
      console.log(participants)
      data = []
      done= []
      target = 0
      peserta_ke = 0      
      cek = participants.length         
       async function culik(){  
         setTimeout(async() => {
          cek -= 1
          peserta_ke += 1
          let _data = data.map(({ mem, promise}) => {
            return `*${mem}*\n_${promise}_\n`
             }).join`\n`      
          if(cek === 0){
           if(target == jumlah){ msg.reply(`Hasil percobaan:\n\n${_data}\n\n*Peserta yang berhasil ditambahkan:* ${target}\n${JSON.stringify(done)}`)
             client.sendMessage(arg, { text: `Hasil percobaan:\n\n${_data}\n\n*Peserta yang berhasil ditambahkan:* ${target}\n${JSON.stringify(done)}`, mentions: [msg.sender] },{ quoted : msg }) 
             console.log('Bermasalah:\n'+JSON.stringify(data)+'\n\nBerhasil: '+target+'\n'+JSON.stringify(done)) }       
             else if(target == 0){ msg.reply(`Tidak ada peserta yang dapat ditambahkan!:\n\n${_data}`)
              console.log('Bermasalah:\n'+JSON.stringify(data)+'\n\nBerhasil:\n'+JSON.stringify(done))                
            } else {
              client.sendMessage(arg, { text: `Hanya dapat menambahkan ${target} peserta\n\n${_data}\n\n*Peserta yang berhasil ditambahkan:* ${target}\n${JSON.stringify(done)}`, mentions: [msg.sender] },{ quoted : msg })  
              msg.reply(`Hanya dapat menambahkan ${target} peserta\n\n${_data}\n\n*Peserta yang berhasil ditambahkan:* ${target}\n${JSON.stringify(done)}`)              
              console.log('Bermasalah:\n'+JSON.stringify(data)+'\n\nBerhasil: '+target+'\n'+JSON.stringify(done))
            }
          } else if(target == jumlah){ msg.reply(`Hasil percobaan:\n\n${_data}\n\n*Peserta yang berhasil ditambahkan:* ${target}\n${JSON.stringify(done)}`) 
          client.sendMessage(arg, { text: `Hasil percobaan:\n\n${_data}\n\n*Peserta yang berhasil ditambahkan:* ${target}\n${JSON.stringify(done)}`, mentions: [msg.sender] },{ quoted : msg }) } else {
           let number = participants[peserta_ke]                  
           let response = await client.groupParticipantsUpdate(arg, [number], "add")     
           let o = await response[0]
           let inv = o.status                    
        if(inv == 200){ target += 1       
             culik()
             done.push(number)
       } else if(inv == 408){ culik()
       data.push({mem: number, promise: 'Dia baru-baru saja keluar dari grub ini!'})       
       } else if(inv == 409){culik()
       data.push({mem: number, promise: 'Dia sudah join'}) 
       } else if(inv == 500){ culik()
       data.push({mem: number, promise: 'Grup Penuh'})
       } else if(inv == 403){ culik()
       data.push({mem: number, promise: 'Private Acc!'})
       }if(inv == 401){ culik()
       data.push({mem: number, promise: 'Tidak Dapat ditambahkan'})
       } else {}       
        }
       }, 5000)
      }
      culik()
   }
    client.parseMention = async (text) => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                                         
    client.sendButtonMessage = async (ID, buttonId, displaytext, text, footer, options) => {
        let buttons = [{
            buttonId: buttonId,
            buttonText: {
                displayText: displaytext
            },
            type: 1
        }]
        let buttonMessage = {
            text: text,
            footer: footer,
            buttons: buttons,
            headerType: 4
        }
        client.sendMessage(ID, buttonMessage, options)
    }
}
//detect
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.yellow(`New ${__filename}`))
    delete require.cache[file]
    require(file)
})