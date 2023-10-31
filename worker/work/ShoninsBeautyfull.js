// ○ Create by @rifza.p.p
const axios = require('axios');
const { sleep } = require('../../lib/function');

const apiUrl = 'https://api.prodia.com/generate';
let pollingIntervalId;

module.exports = {
  order: ['shonins'],
  tags: 'ai',
  command: ['shonins'],
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
    let text1 = q.split("|")[0];
    let text2 = q.split("|")[1] ? q.split("|")[1] : "bad image, low quality"
    
    await sleep(1000);
    let mess = await client.sendMessage(
      from,
      { text: 'Please wait!...' },
      { quoted: msg }
    );

    const payload = {
      new: true,
      prompt: text1,
      model: "shoninsBeautiful_v10.safetensors [25d8c546]",
      negative_prompt: text2,
      steps: 25,
      cfg: 7,
      seed: Math.floor(Math.random() * 1000000000),
      sampler: "DPM++ SDE Karras",
      aspect_ratio: "square",
    };

    let res = await axios.get(apiUrl, { params: payload });
    const data = res.data;

    const jobUrl = 'https://api.prodia.com/job/' + data.job;
    const resultImg = 'https://images.prodia.xyz/' + data.job + '.png?download=1';
    let currentStatus = '';
    //reference code from rifza.p.p
    function checkStatus() {
      axios.get(jobUrl)
        .then(response => {
          const data = response.data;
          if (data.status !== currentStatus) {
            currentStatus = data.status;
            client.editMessage(from, mess.key.id, 'Status: ' + currentStatus);
            if (currentStatus === 'succeeded') {
              client.sendMessage(from, { image: { url: resultImg }, mimetype: 'image/jpeg', caption: 'Result' }, { quoted: msg });
              clearInterval(pollingIntervalId);
              return;
            }
          }
        })

    }

    const pollingInterval = 1000;
    pollingIntervalId = setInterval(checkStatus, pollingInterval);
  },
};
