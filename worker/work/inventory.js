 const SETTING = require('../../validator/config')

 const {
 	addInventory,
 	checkInventory,
 	getInventory,
 	addCoin,
 	kurangCoin,
 	getCoin,
 	addDarah,
 	kurangDarah,
 	getDarah,
 	addBesi,
 	kurangBesi,
 	getBesi,
 	addEmas,
 	kurangEmas,
 	getEmas,
 	addEmerald,
 	kurangEmerald,
 	getEmerald,
 	addUmpan,
 	kurangUmpan,
 	getUmpan,
 	addPotion,
 	kurangPotion,
 	getPotion
 } = require('../../lib/inventory')
let { 
    checkPremiumUser
   } = require('../../lib/premium')

 module.exports = {
 	order: ['profile', 'profil', 'inventory'],
 	tags: 'RPG',
 	command: ['inventory'],
 	maintenance: false,
 	owner: false,
 	co_owner: false,
 	group: false,
 	groupAdmins: false,
 	botGroupAdmins: false,
 	quotedVideo: false, //quotedVideo: "pesannya"
 	quotedImage: false, //quotedImage: "pesannya"
 	quotedAudio: false, //quotedAudio: "pesannya"
 	premium: false, //true/false
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
 	  const isGroup = from.endsWith(SETTING['chats'][1])
 	  const myowner = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
 	  const botNumber = client.user.id.split(':')[0] + SETTING['chats'][0]
      const prem = await checkPremiumUser(msg.sender, global.USER_PREMIUM) ? "Ya" : "Tidak"          
      const isOwner = [botNumber, ...global.ownerNumber].map(jid => jid.replace(/[^0-9]/g, '') + SETTING['chats'][0]).includes(myowner) ? "Ya" : "Tidak"   
      const isCoOwner = CO_OWNER.includes(msg.sender) ? "Ya" : "Tidak"   

            try {
              var ppuser = await client.profilePictureUrl(msg.sender, 'image')
             } catch  {
               var ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
            }
            let txt = `_[ 👩🏻‍💼INFO USER👨🏻‍💼 ]_\n\n`
               txt += `*Username :* ${msg.pushName}\n`
               txt += `*Chat :* https:/\/wa.me/\/${msg.sender.replace("@s.whatsapp.net", "")}\n`
               txt += `*Prefix :* ${prefix}\n`
               txt += `*isPremium*: ${prem}\n`
               txt += `*isOwner*: ${isOwner}\n`
               txt += `*isCoOwner*: ${isCoOwner}\n`              
               txt += `*❤️Darah* : ${getDarah(msg.sender) || '0'}\n`
               txt += `*🪙Coin* : ${getCoin(msg.sender) || '0'}\n`
               txt += `*◻️️Besi* : ${getBesi(msg.sender)  || '0'}\n`
               txt += `*🌟Emas* : ${getEmas(msg.sender) || '0'}\n`
               txt += `*💎Emerald* : ${getEmerald(msg.sender) || '0'}\n`
               txt += `*🧪Potion* : ${getPotion(msg.sender) || '0'}\n`
            
    const imageMessage = {
        text: txt,
        contextInfo: {
          externalAdReply: {
            thumbnailUrl: ppuser,
            mediaUrl: "http://ẉa.me/6283110928302/"+Math.floor(Math.random() * 100000000000000000),
            renderLargerThumbnail: true,
            showAdAttribution: true,
            mediaType: 1,
          },
        }
    }
            client.sendMessage(from, imageMessage, { quoted: msg })
          
  }
 }
 
 
