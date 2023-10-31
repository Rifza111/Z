const SETTING = require('../../validator/config')
const modul = SETTING['modul']
const fs = modul['fs']
let {
    default: getContentType,
    generateWAMessageFromContent,
    proto
} = modul['baileys']
module.exports = {
  order: ['lokasi'],
  tags: 'baileys',
  command: [ 'lokasi'],
  owner: false,
  co_owner: false,
  group: false,
  groupAdmins: false,
  botGroupAdmins: false,    
      exec: async (msg, client, from, { q, args, order, prefix }) => {      

      res = generateWAMessageFromContent(from, proto.Message.fromObject(
      { "ptvMessage": {
          "url": "https://v16m-default.akamaized.net/410093c620f59b9173c387e7d14fb89e/64b1bca2/video/tos/useast2a/tos-useast2a-ve-0068c003/o46QtwneATvEZBJkRTPBBZrNOhEiIQf1rJCdtz/?a=0&amp;ch=0&amp;cr=0&amp;dr=0&amp;lr=all&amp;cd=0%7C0%7C0%7C0&amp;cv=1&amp;br=1658&amp;bt=829&amp;cs=0&amp;ds=6&amp;ft=iJOG.y7oZZv0PD1-ie1Xg9wo6-BXBEeC~&amp;mime_type=video_mp4&amp;qs=0&amp;rc=ZDRlaDZnOmU4aGQ0NWQ1NEBpampndTQ6ZnlzazMzNzczM0AyLS5fNDYyXmAxLy42MzUtYSM0Z2E2cjRfa25gLS1kMTZzcw%3D%3D&amp;l=20230714152214D2EBC85B7FA7111FCF18&amp;btag=e00080000",
          "height": 656,
          "width": 368,
          "mimetype": "video/mp4"
        }
       }))
       res.ptvMessage = res.videoMessage
delete res.videoMessage
      client.relayMessage(from, res.message,
      {
        messageId: res.key.id,
      })
      
  
      > const thumbnail = fs.readFileSync("./lib/container/image/thumb.jpg") 
      client.relayMessage(from, {
  "locationMessage": {
    "degreesLatitude": -1.5143912887677375,
    "degreesLongitude": 102.11700178593895,
    "name": "Kantor \nBupati \nBungo \n\n\n\TESSSSSS",
    "address": "Kecamatan Muara Bungo, Jambi",
    "url": "https://foursquare.com/v/50f76516e4b0a43ac6422dc1",
    "jpegThumbnail": thumbnail.toString("base64")
  }
}, {})    
      
 const thumb = fs.readFileSync("./lib/container/image/thumb.jpg")
      res = generateWAMessageFromContent(from,
      {
        "liveLocationMessage":
        {
          "degreesLatitude": -7.8374838,
          "degreesLongitude": 727.8383838,
          "caption": `wlejejdbb`,
          "sequenceNumber": "1532280505",
          "thumbnail": thumb,
          "contextInfo":
          {
            "forwardingScore": 150,
            "isForwarded": true
          }
        }
      },
      {
        quoted:
        {
          key:
          {
            participant: `0@s.whatsapp.net`,
            ...(
            {
              remoteJid: ""
            })
          },
          message:
          {
            liveLocationMessage:
            {
              caption: `fotjjhoghfg`,
              jpegThumbnail: thumb,
            }
          }
        },
        contextInfo:
        {}
      })
      client.relayMessage(from, res.message,
      {
        messageId: res.key.id,
      })
}
}

