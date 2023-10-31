const SETTING = require('../../validator/config')
const modul = SETTING['modul']
let {
    default: getContentType,
    generateWAMessageFromContent,
    proto
} = modul['baileys']
const clock = ['🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕡','🕖','🕢','🕗','🕗','🕣','🕘','🕤','🕙','🕥','🕚','🕦']
const { sleep } = require('../../lib/function')
module.exports = {
  order: ['jam'],
  owner: false,
  co_owner: false,
  group: false,
  groupAdmins: false,
  botGroupAdmins: false,  
      exec: async (msg, client, from, { q, args, order, prefix }) => {      

 await client.sendMessage(from, {text: clock[0]}).then(async mse => {                                  
            async function loading(item) {
                          
     prex = generateWAMessageFromContent(from, proto.Message.fromObject(
        {
          "editedMessage":
          {
            "message":
            {
                "protocolMessage":{
                 "key":{
                  "remoteJid":from,
                  "fromMe":true,
                  "id":mse.key.id
                 },
                  "type":"MESSAGE_EDIT",
                  "editedMessage":{
                  "conversation": clock[item]+''
                  }
              }
            }
          }
        }),
        {
          userJid: from,
          quoted: msg
        })
        client.relayMessage(from, prex.message,
        {
          messageId: prex.key.id
        })
                  await sleep(1000)
                  if(item == 24){ 
                     return
                   } else {
                    loading(1+item)
                   }               
            } 
            
                 
                 loading(0)
})            
}
}

