const { stableDiffusion } = require('../engine/space')
const fs = require('fs')
const { getRandom } = require('../../lib/function')

module.exports = {
    order: ['anythingv4','at4'],
    owner: false,
    co_owner: false,
    group: false,
    groupAdmins: false,
    botGroupAdmins: false,    
    exec: async (msg, client, from, { q, args, order }) => {
          if(!q) return msg.reply('Berikan deskripsi gambar anda!')
            let text1 = q.split("|")[0]
            let text2 = q.split("|")[1]
              if (!text1) return msg.reply(`*Format salah!*\n\nPerhatikan petunjuk berikut!\n${order + ' ' + '<text1>|<text2>'}\n_<text1> = your prompt\n<text2> = your negative prompt_`)    
              if (!text2) return msg.reply(`*Format salah!*\n\nPerhatikan petunjuk berikut!\n${order + ' ' + '<text1>|<text2>'}\n_<text1> = your prompt\n<text2> = your negative prompt_`)    
             msg.reply('processing....')
               let sd = await stableDiffusion(text1, text2)
               msg.reply('sending....')
             client.sendMessage(from, { image: { url: ''+sd }, caption: 'Result' },{quoted: msg})
    }
}
         
                  
