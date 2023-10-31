const WebSocket = require('ws');
const fs = require("fs")

let wss = 'wss://zomehwh-vits-models.hf.space/queue/join';
let session = 'ulus6emsnxl'

exports.vits = async (text, character) =>{
return new Promise(async(resolve, reject) => {
let result = {}
let characters = { 
 "saiba_momoi": 20,
 "narsume_iroha": 25,
 "misono_mika": 30,
 "kasumizawa_miyu": 35,
 "shirasu_azusa": 40,
 "tendou_alice": 45,
 "sunaookami_shiroko": 50,
 "sorasaki_hina": 55,
 "shiromi_iori": 60,
 "kuda_izuna": 65,
  'hayase_yuuka': 70
  }
let getCharacter = characters[character]

let send_has_payload = {"session_hash":session, "fn_index": getCharacter}
let send_data_payload =  {
  "fn_index": getCharacter,
  "data": [
    text,
    "Japanese",
    0.6,
    0.668,
    1,
    false
  ],
  "session_hash": session
}

    const ws = new WebSocket(wss);
    ws.onopen = function() {
     console.log("Connected to websocket")
    };

    ws.onmessage = async function(event) {
      let message = JSON.parse(event.data);

      switch (message.msg) {
        case 'send_hash':
          ws.send(JSON.stringify(send_has_payload));
          break;

        case 'send_data':
          ws.send(JSON.stringify(send_data_payload));
          break;
        case 'process_completed':        
          result.base64 = message.output.data[1].replace('data:audio/wav;base64,', '') 
          break;
      }
    };

    ws.onclose = function(event) {
      if (event.code === 1000) {
        console.log('Process completed️');
      } else {
        msg.reply('Err : WebSocket Connection Error:\n');
      }
      resolve(result)
    };
  })
}