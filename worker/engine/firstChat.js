/**
  @Made by ©Rifza Pratama P
*/
const fs = require('fs')
const SETTING = require('../../validator/config')
const dbase = JSON.parse(fs.readFileSync('./lib/container/database/userchat.json'))
const { addInvDate, checkUser, updateDate, getDate } = require('../../lib/container/database/userDate')
const modul = SETTING["modul"]
  const moment = modul['time'];
  const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')

exports.chatUser = async(from, msg, client) => {
  const isUsrChat = checkUser(msg.sender)   
  const isCekDate = getDate(msg.sender) 
         let buttonMessage = { 
            text: 'Terimakasih karena telah menghubungi kami, apaka ada yang bisa kami bantu?', 
            footer: time, 
            mentions: [msg.sender], 
             buttons: [
              {  
               buttonId: `#menu`, 
               buttonText: {  
                         displayText: 'M E N U'
                       }, 
               type: 1
              } 
             ], 
          headerType: 4 
         }    
       if(!isUsrChat){ 
          addInvDate(msg.sender, new Date() * 1) 
        } 
       if (new Date() * 1 - isCekDate < 43200000) return//12 hours 
            client.sendMessage(from, { text: 'Terimakasih karena telah menghubungi kami, apaka ada yang bisa kami bantu?\n-> _.menu_ ' }, { quoted: msg.fkontak() })
     updateDate(msg.sender, new Date() * 1)
}