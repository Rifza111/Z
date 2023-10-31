const { meina } = require('../engine/space')
const fs = require('fs')
const clock = ['🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕡','🕖','🕢','🕗','🕗','🕣','🕘','🕤','🕙','🕥','🕚','🕦']
/*         <lora:Sv4:0.7>, 
         <lora:illya22outfits:0.7>, 
         <lora:KafkaV4:0.7>, 
         <lora:asamiya_athena_3:0.7>
         */
module.exports = {
    order: ['meinamix','meina','animegenerator','animgenerator','ag','posegenerator'],
    owner: false,
    co_owner: false,
    group: false,
    groupAdmins: false,
    botGroupAdmins: false,      
    exec: async (msg, client, from, { q, args, order }) => {
      if ((msg.isQuotedImage)) {
           if(!q) return msg.reply('Berikan deskripsi gambar anda!')
            let text1 = q.split("|")[0]
            let text2 = q.split("|")[1]
              if (!text1) return msg.reply(`*Format salah!*\n\nPerhatikan petunjuk berikut!\n${order + ' ' + '<text1>|<text2>'}\n_<text1> = your prompt\n<text2> = your negative prompt_`)    
              if (!text2) return msg.reply(`*Format salah!*\n\nPerhatikan petunjuk berikut!\n${order + ' ' + '<text1>|<text2>'}\n_<text1> = your prompt\n<text2> = your negative prompt_`)    

              let media = await client.downloadMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')                                                                                                          

             
           let mei = await meina(media.toString('base64'), text1, text2, '<lora:Sv4:0.7>')
             console.log(meina)      
                await client.sendMessage(from, {text: '```SEDANG DI PROSES...```'}, { quoted: msg });                  
                await client.sendMessage(from, { image: { url : mei },  caption: 'Result' },{quoted: msg})        

       } else { msg.reply(`Reply gambar dengan caption ${order}`) }
    }
}
         
                  
