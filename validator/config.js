"use strict";
const fs = require('fs')
const chalk = require('chalk')
global.ownerNumber = ["6283110928302"]
module.exports = {
  ig: "https://instagram.com/rifza.p.p",
  autoreadsw: true,
  coinawal: 1000,
  darahawal: 100,
  besiawal: 15,
  emasawal: 10,
  emeraldawal: 5,
  umpanawal: 5,
  potionawal: 1,
  harga: {
    normal: 10,
    tiktok: 15,
    threads: 13,
    ytmp3: 12,
    ytmp4: 20,
    ssweb: 5,
    img_generation: 100   
  },
  sesionName: "session",
  botName: "DIMKUSI",
  ownerName: 'Ⓒrifza.p.p',
  message: [ 
         '[ *[❗]CHAT DITERUSKAN[❗]* ]',
         'Khusus Group!',
         'Khusus Owner!',
         'Khusus Admin!',
         'Bot bukan Admin!',         
         '```「▰▰▱▱▱▱▱▱▱▱」Loading...```',
         '```「▰▰▰▰▰▰▰▰▱▱」Sending...```',
         '「▰▰▰▰▰▰▰▰▰▰」Success✓!',
         "Masukan nomer target",
         'Khusus member premium!'
       ],
  chats: [ '@s.whatsapp.net', '@g.us' ],
  mode: ['[ PUBLIC - MODE ]','[ SELF - MODE ]'],
  api:{//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
     openai: ['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','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'],
     removebg: ['zNKnayDFH1nugtA81fkPMzXn','5CyygkXiT5vrki2Z6ZsUCE8u','Mz4yJkagrCLotdgsr4Ms39ud','vEeWnzQws9kJoYNMYKhbT1s6','2arViktax9HUdMqy9U7wFLKT','sfZpRHNwVPAG57nZVHijYZ9v','oqVVyQ2rBDYdUrxThg4GdjhA','rGp4axHpQ56Y5tRLX7J789QC','NfPx6NgTkpVYLnKUZHCAM1P3'],//https://remove.bg/api
     unscreen: ['N6J4Bjbyh2V4eqhAPTWYtFER','fcKJkPstNXp4pjntYt3bR38E'],
     ame: '1f486b04b157f12adf0b1fe0bd83c92a28ce768683871d2a390e25614150d0c8fa404fd01b82a5ebf5b82cbfa22e365e611c8501225a93d5d1e87f9f420eb91b',
     sightengine: [ 
       {
         api_user: '935693939',
         api_secret: '2eYtxpdkkWMdtFPo4Fz5'
       },
       {
         api_user: '22091606',
         api_secret: 'r24KGtTSJfDjthMeaX5U'
       },
       
     ],
     imgsuper: ['198f69d4b2msh0021bb0690669a6p1f3a80jsn9cab1ae485cc','85731a45bbmshf7bd86f09b300c2p14e544jsncd18a8d5dba2'],//https://super-image1.p.rapidapi.com/
     speechtotext: ['897beebb3ac74ceeaa6f8d0903b2297a']
   },
  modul: {   
     axios: require('axios'),
     baileys: require("@whiskeysockets/baileys"),
     boom: require('@hapi/boom'),
     chalk: require('chalk'),
     cheerio: require("cheerio"),
     child: require('child_process'),
     chokidar: require('chokidar'),
     fs: require('fs'),
     https: require('https'),
     jimp: require('jimp'),
     md5: require('md5'),
     ms: require('parse-ms'),
     obfuscator: require('javascript-obfuscator'),
     openai: require("openai"),
     path: require("path"),
     phonenumber: require('awesome-phonenumber'),
     phin: require("phin"),
     pino: require("pino"),
     qrcode: require('qrcode'),
     QrCode: require('qrcode-reader'),
     request: require('request'),
     sizeFormater: require('human-readable'),
     speed: require('performance-now'),
     time: require("moment-timezone"),
     util: require("util"),
     uuid: require('uuid'),
     ytsr: require('ytsr')
   }
 }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.yellow(`New ${__filename}`))
	delete require.cache[file]
	require(file)
})