const WebSocket = require('ws');
const chalk = require('chalk');
const { sleep } = require('../../lib/function');

let wss = 'wss://darkstorm2150-protogen-web-ui.hf.space/queue/join';
let send_has_payload = {"session_hash":"ofo1kpovo2a","fn_index":49}

module.exports = {
  order: ['protogen','text2img'],
  tags: 'ai',
  command: [ 'protogen'],
  coin: 'img_generation',
  quoted: 'Berikan deskripsi gambar anda!\n-> #<command> <prompt>|<negativeprompt>',
  quotedSticker: false,
  quotedStickerVideo: false,
  quotedUrl: false,
  owner: false,
  co_owner: false,
  group: false,
  groupAdmins: false,
  botGroupAdmins: false,
  quotedVideo: false,
  exec: async (msg, client, from, { q, args, order, prefix }) => {
    if (global.queue.has('protogen' + msg.sender)) return msg.reply('*SILAHKAN TUNGGU SAMPAI PROSES SEBELUMNYA SELESAI!*\nKami sedang berusaha memproses gambar yang anda minta sebelumnya!...');

    let text1 = q.split("|")[0];
    let text2 = q.split("|")[1];

    if (!text1 || !text2) return msg.reply(`*Format salah!*\n\nPerhatikan petunjuk berikut!\n${order + ' ' + '<text1>|<text2>'}\n_<text1> = your prompt\n<text2> = your negative prompt_`);
    let mess = await client.sendMessage(from, { text: 'Please wait!...' }, { quoted: msg });
   try{
    await sleep(1000);
    let send_data_payload = {
     "fn_index": 49,
     "data": [
       text1,
       text2,
       "None",
       "None",
       20,
       "DPM++ SDE Karras",
       false,
       false,
       1,
       1,
       7,
      -1,
      -1,
      0,
      0,
      0,
      false,
      1024,
      728,
      false,
      0.7,
      0,
      0,
      "None",
      null,
      "",
      ""
    ],
     "session_hash": "ofo1kpovo2a"
   }

    const ws = new WebSocket(wss);
    global.queue.add('protogen' + msg.sender);

    ws.onopen = function() {
      client.editMessage(from, mess.key.id, 'Connected websocket✔️');
    };
    ws.onmessage = function(event) {
      let message = JSON.parse(event.data);

      switch (message.msg) {
        case 'send_hash':
          ws.send(JSON.stringify(send_has_payload));
          break;

        case 'estimation':
          client.editMessage(from, mess.key.id, 'Menunggu antrean: ️' + message.rank);
          break;

        case 'send_data':
          ws.send(JSON.stringify(send_data_payload));
          break;

        case 'process_completed':
          client.sendMessage(from, { image: { url: 'https://darkstorm2150-protogen-web-ui.hf.space/file='+ message.output["data"][0][0]["name"] }, mimetype: 'image/jpeg', caption: 'Result' }, { quoted: msg });
          global.queue.delete('protogen' + msg.sender);
          break;
      }
    };

    ws.onclose = function(event) {
      global.queue.delete('protogen' + msg.sender);
      if (event.code === 1000) {
        client.editMessage(from, mess.key.id, 'Process completed✔️');
      } else {
        client.editMessage(from, mess.key.id, 'WebSocket Connection Error:\n');
      }
    };
    } catch (e) {
      global.queue.delete('protogen' + msg.sender);
      client.editMessage(from, mess.key.id, e)      
    }
  }
};
