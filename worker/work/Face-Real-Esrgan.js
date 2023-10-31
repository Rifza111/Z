const { sleep, getRandom } = require('../../lib/function');
const WebSocket = require('ws');
const fs = require("fs");

let wss = 'wss://doevent-face-real-esrgan.hf.space/queue/join';
let send_has_payload = {"fn_index":0,"session_hash":"w385zm06mj"};

module.exports = {
  order: ['realesrgan', 'upscale', 'esrgan'],
  tags: 'ai',
  command: ['upscale'],
  coin: false,
  quoted: false,
  quotedSticker: false,
  quotedStickerVideo: false,
  quotedUrl: false,
  owner: false,
  co_owner: false,
  group: false,
  groupAdmins: false,
  botGroupAdmins: false,
  quotedVideo: false,
  quotedImage: 'Reply gambarnya!',
  exec: async (msg, client, from, { q, args, order, prefix }) => {
    let getImgMsg = msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;

    if (global.queue.has('esrgan' + msg.sender)) return msg.reply('*SILAHKAN TUNGGU SAMPAI PROSES SEBELUMNYA SELESAI!*\nKami sedang berusaha memproses gambar yang anda minta sebelumnya!...');
    let mess = await client.sendMessage(from, { text: 'Please wait!...' }, { quoted: msg });
    
    let media = await client.downloadAndSaveMediaMessage(getImgMsg, 'image');
    if (args[0] === '2x') {
      upTo = "2x";
    } else if (args[0] === '4x') {
      upTo = "4x";
    } else if (args[0] === '8x') {
      upTo = "8x";
    } else {
      upTo = "8x";
    }
    console.log(upTo);

    let send_data_payload =  {"data":["data:image/jpg;base64," + fs.readFileSync(media).toString('base64'), upTo],"event_data":null,"fn_index":0,"session_hash":"n15r20uxyon"};
    if (fs.existsSync(media)) fs.unlinkSync(media);

    const ws = new WebSocket(wss);
    global.queue.add('esrgan' + msg.sender);

    ws.onopen = function() {
      client.editMessage(from, mess.key.id, 'Connected to websocket server');
    };

    ws.onmessage = async function(event) {
      let message = JSON.parse(event.data);

      switch (message.msg) {
        case 'send_hash':
          ws.send(JSON.stringify(send_has_payload));
          break;

        case 'estimation':
          client.editMessage(from, mess.key.id, 'Menunggu antrean: ️' + message.rank);
          break;

        case 'send_data':
          client.editMessage(from, mess.key.id, 'Processing your image....');        
          ws.send(JSON.stringify(send_data_payload));
          break;

        case 'process_completed':
          let ranJ = getRandom('.jpg');
          let result = new Buffer.from(message.output.data[0].replace('data:image/png;base64,', ''), 'base64');
          client.editMessage(from, mess.key.id,'Sending your results....️');
          await client.sendMessage(from, { document: result, fileName: ranJ, mimetype: 'image/jpeg', caption: 'Result' }, { quoted: msg });
          global.queue.delete('esrgan' + msg.sender);
          break;
      }
    };

    ws.onclose = function(event) {
      global.queue.delete('esrgan' + msg.sender);
      if (event.code === 1000) {
        client.editMessage(from, mess.key.id, 'Process completed️');
      } else {
        client.editMessage(from, mess.key.id, 'Err : WebSocket Connection Error:\n');
      }
    };
  }
};
