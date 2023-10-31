const WebSocket = require('ws');
const chalk = require('chalk');
const { sleep } = require('../../lib/function');

let wss = 'wss://manjushri-photoreal-v2.hf.space/queue/join';
let send_has_payload = {"fn_index": 0, "session_hash": "ct6a2mk4u17"};

module.exports = {
  order: ['dreamlike'],
  tags: 'ai',
  command: 'dreamlike',
  coin: ['img_generation'],
  quoted: 'Berikan deskripsi gambar anda!\n-> #dreamlike <prompt>|<negativeprompt>',
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
    if (global.queue.has('dreamlike' + msg.sender)) return msg.reply('*SILAHKAN TUNGGU SAMPAI PROSES SEBELUMNYA SELESAI!*\nKami sedang berusaha memproses gambar yang anda minta sebelumnya!...');

    let text1 = q.split("|")[0];
    let text2 = q.split("|")[1];

    if (!text1 || !text2) return msg.reply(`*Format salah!*\n\nPerhatikan petunjuk berikut!\n${order + ' ' + '<text1>|<text2>'}\n_<text1> = your prompt\n<text2> = your negative prompt_`);

    await sleep(1000);
    let mess = await client.sendMessage(from, { text: 'Please wait!...' }, { quoted: msg });
    let send_data_payload = {
      "data": [
        text1,
        text2,
        1024,
        768,
        10,
        50,
        Math.floor(Math.random() * 10000000000000000),
        "No",
        "",
        "",
        0,
        5
      ],
      "event_data": null,
      "fn_index": 0,
      "session_hash": "ct6a2mk4u17"
    };

    const ws = new WebSocket(wss);
    global.queue.add('dreamlike' + msg.sender);

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
          let result = new Buffer.from(message.output.data[0].replace('data:image/png;base64,', ''), 'base64');
          client.sendMessage(from, { image: result, mimetype: 'image/jpeg', caption: 'Result' }, { quoted: msg });
          global.queue.delete('dreamlike' + msg.sender);
          break;
      }
    };

    ws.onclose = function(event) {
      global.queue.delete('dreamlike' + msg.sender);
      if (event.code === 1000) {
        client.editMessage(from, mess.key.id, 'Process completed✔️');
      } else {
        client.editMessage(from, mess.key.id, 'WebSocket Connection Error:\n');
      }
    };
  }
};
