// ○ Create by @rifza.p.p
const axios = require('axios');
const { sleep } = require('../../lib/function');

const createTask = 'https://mst.ai/stableDiffusion/api/web/draw/createTask';
const drawTask = 'https://mst.ai/stableDiffusion/api/web/draw/drawTaskResult';
//Majic Mix v4 : 1c36241d3c9148fdb642f9f162df19e0
let models = {
 'sdxl': '282136cfc9924a83a02c09665d9097a7',
 'stablediffusion': '282136cfc9924a83a02c09665d9097a7',
 'stabledifusion': '282136cfc9924a83a02c09665d9097a7',
 'majicmixv4' : '1c36241d3c9148fdb642f9f162df19e0',
 'majicmix_ashley': '1c36241d3c9148fdb642f9f162df19e0',
 'majicmix_realistic': '184cb3fd55014f7697f3f6c58bae987c',
 'majicmix_xuner': '184cb3fd55014f7697f3f6c58bae987c',
 'ghostshell': '16905c58e34f44738f5b9d16a3a764e5',
 'realisianv4': 'a5985aed23d0467f9df7372131ba5029',
 'chilloutmix': '5c68f1725721403c933b64e3065f1794',
 'chilloutmix_medusa': '5c68f1725721403c933b64e3065f1794',
 'guofengrealmix': 'c0fdca6970ef448499a1768d757758b7',
 'abyssorangemix3': '69b107cb47e44087b4c96e65c6c42707',
 'lyriel': '3833b1860d90424caafca7dfaec3a3d9',
 'anythingv5': '0d2ee3850b824f8d9c4cf5efd8a89710',
 'yesmix': 'd295aa38874048ee9e0a264eaf7ef71b',
 'ghostmix': '30dc7321b702404588aa040f19cd4413',
 'majicmix_lux': 'f9c9ef4ffea9499cb028b43bdc3b53a4',
 'orangemix' : '7254e9b2d4ba48ee8735fa232daa7843',
 'xsmix' : '42edd4cb70fe4707a5168a7387e4767f',
 'cyber_realistic' : '172f1011727e4673ac647150d50fab2f',
 'breansticlass' : '4094020ae2634d93b3c57518780ebcc1',
 'night_sky' : '46a42bbfb3b14148ae439bec90f9b175',
 'moonfilm' : '6753a873743c49ccbe95d655d64624b4',
 'ydenv3' : 'd67c2e3ce9a643869b91a87f2a6dbe0e',
 'xsmixv0' : 'a283cf232ee14ebe933a8accb9e35d7b',
 'tmndmixv3' : 'c9ea982951844422af946930da9c7bd8',
 'realbeautymix' : '6dbcb5b766d642ec91a0bcd1bba42550',
 'dreanshaperv4' : 'e78cb609853b4ea4ae74d5142e740abf',
 'babes' : 'be1dda41bf8343719afc64ce9e7bd918',
 'meinapastelv6' : 'a27b2848a84c4c559cdb3bb24b83da7d',
 'bougainvillea_mix' : 'a108af3d50a4491cac3f4ccd5ac490d7',
 'geminimix' : 'e12ad8971e3c4464ae44b6fc87561f65',
 'neverending' : '71db17a85cbf43b1863a48cfaef6bbcc',
 'meinamixv10' : '8804f661dae44136a7bc0c6bc1dc256ex',
 'counterfeitv25' : 'abbc829165714366a96cfc0db827332c',
 'meinaunreal' : '279209425a28453ebf7b3d045bfe40c6',
 'revanimatedv11' : '23f35d7bf2884c078ae6a2fd4678c7d8',
 'chilloutmix_NiPrunedFp32Fix' : '1327d4ec633d4f628e59dd32f1c5b4ec',
 'aom3' : '12a22e3a1f9f4398b7b2ecf8b2579eb4',
 'chikmixv3' : '12a22e3a1f9f4398b7b2ecf8b2579eb4',
 'delcefo_paintingv2' : '1accf43d4dcc446caece098e757238fc',
 'majicmix_sombre' : '122fa73b03c246458219be4650d9e344',
 'checkpoin_marge' : '18f57707599f4c939e367406c59d33ee',
 'puremixv1' : '1fa0abd6d87e429a95b86928a559937e'
}

module.exports = {
 order: ["sdxl","stabledifusion","stablediffusion","majicmixv4","majicmix_ashley","majicmix_realistic","majicmix_xuner","ghostshell","realisianv4","chilloutmix","chilloutmix_medusa","guofengrealmix","abyssorangemix3","lyriel","anythingv5","yesmix","ghostmix","majicmix_lux","orangemix","xsmix","cyber_realistic","breansticlass","night_sky","moonfilm","ydenv3","xsmixv0","tmndmixv3","realbeautymix","dreanshaperv4","babes","meinapastelv6","bougainvillea_mix","geminimix","neverending","meinamixv10","counterfeitv25","meinaunreal","revanimatedv11","chilloutmix_NiPrunedFp32Fix","aom3","chikmixv3","delcefo_paintingv2","majicmix_sombre","checkpoin_marge","puremixv1"],
 tags: 'stablediffusion',
 command: ["sdxl", "stablediffusion","majicmixv4","majicmix_ashley","majicmix_realistic","majicmix_xuner","ghostshell","realisianv4","chilloutmix","chilloutmix_medusa","guofengrealmix","abyssorangemix3","lyriel","anythingv5","yesmix","ghostmix","majicmix_lux","orangemix","xsmix","cyber_realistic","breansticlass","night_sky","moonfilm","ydenv3","xsmixv0","tmndmixv3","realbeautymix","dreanshaperv4","babes","meinapastelv6","bougainvillea_mix","geminimix","neverending","meinamixv10","counterfeitv25","meinaunreal","revanimatedv11","chilloutmix_NiPrunedFp32Fix","aom3","chikmixv3","delcefo_paintingv2","majicmix_sombre","checkpoin_marge","puremixv1"],
 coin: 'img_generation',
 quoted: 'Berikan deskripsi gambar anda!\n-> #<command> <prompt>',
 quotedSticker: false,
 quotedStickerVideo: false,
 quotedUrl: false,
 maintenance: false,
 owner: false,
 co_owner: false,
 group: false,
 groupAdmins: false,
 botGroupAdmins: false,
 quotedVideo: false,
 exec: async (msg, client, from, { q, args, order, prefix }) => {
 if (global.queue.has(order.slice(1) + msg.sender)) return msg.reply('*SILAHKAN TUNGGU SAMPAI PROSES SEBELUMNYA SELESAI!*\nKami sedang berusaha memproses gambar yang anda minta sebelumnya!...');
 
 const getModel = models[order.slice(1)];
 console.log(getModel);

 const text1 = q.split("|")[0];
 const text2 = q.split("|")[1] ? q.split("|")[1] : "low quality, bad hands, double face, bad image"
 const ratio = q.split("#")[1];
 if(ratio){
 if(ratio == '1:1'){ 
 width = 940
 height = 940
 } else if(ratio.includes('x')){ 
 let xx = ratio
 width = xx.split("x")[0]
 height = xx.split("x")[1]
 if(isNaN(height)){ 
 global.queue.delete(order.slice(1) + msg.sender);
 return msg.reply("ratio yg anda masukkan bukan angka!")
 }
 } else {
 width = 840
 height = 1060
 }
 } else {
 width = 840
 height = 1060
 }
 

 const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
 await sleep(1000); 
 let mess = await client.sendMessage(
 from,
 { text: 'Please wait!...' },
 { quoted: msg }
 );
 const payload = {
 "authToken": "6e7b5b6a213a4cafa162769da6b54b2c",
 "modelId": getModel,
 "apiVersion": 2,
 "negativePrompt": text2,
 "prompt": text1,
 "width": width,
 "height": height,
 "imageNum": 1,
 "cfgScale": 7,
 "clipSkip": 2,
 "denoisingStrength": 0.75,
 "ensd": 0,
 "samplingId": 16,
 "samplingStep": 30,
 "seed": Math.floor(Math.random() * 100000000000000)
}

 if (order.slice(1) === 'chilloutmix_medusa') {
 payload["loraModels"]= [
 {
 "lora_model_id": "ebc545a7c3e14a4a8d17d9eabc92da39",
 "lora_weight": "0.7"
 }
 ]

 }
 if (order.slice(1) === 'majicmix_xuner') {
 payload["loraModels"]= [
 {
 "lora_model_id": "c6d8565cd44246e8b8f4f8654c657751",
 "lora_weight": "0.7"
 }
 ]

 }
 if (order.slice(1) === 'majicmix_ashley') {
 payload["loraModels"]= [
 {
 "lora_model_id": "82ddec9d11cc45d48b4070f307e67c82",
 "lora_weight": "0.7"
 }
 ]

 }

 try {
 let res = await axios.post(createTask, payload);
 const data = res.data;
 console.log(data); 

 global.queue.add(order.slice(1) + msg.sender);

 let currentStatus = '';
 let pollingInterval = {};
 
 let date = new Date() * 1
 async function checkStatus() {
 try {
 if(data.code == 99008){
 clearInterval(pollingInterval[date]);
 global.queue.delete(order.slice(1) + msg.sender);
 return msg.reply(`❗️ ${data.message}`) 
 }
 if(data.code == 8){
 clearInterval(pollingInterval[date]);
 global.queue.delete(order.slice(1) + msg.sender);
 return msg.reply(`❗️ ${data.message}`) 
 }
 let response = await axios.post(drawTask, {
 authToken: '6e7b5b6a213a4cafa162769da6b54b2c',
 taskIds: data.data.taskIds
 });
 const _data = response.data.data.taskResults[0];
 if (_data.taskStatus !== currentStatus) {
 currentStatus = _data.taskStatus;
 if (currentStatus === -1) {
 clearInterval(pollingInterval[date]);
 global.queue.delete(order.slice(1) + msg.sender);
 return client.editMessage(from, mess.key.id, _data.taskErrorMessage);
 } else if (currentStatus === 1) {
 await client.editMessage(from, mess.key.id, `Status: ${response.data.data.taskResults[0].progress.realStep || response.data.data.taskResults[0].progress.step}\nProgress: ${response.data.data.taskResults[0].progress.progress}%`);
 return
 } else if (currentStatus === 2) {
 clearInterval(pollingInterval[date]);
 global.queue.delete(order.slice(1) + msg.sender);
 await client.sendMessage(from, { image: { url: _data.imageList[0] }, mimetype: 'image/jpeg', caption: `${JSON.stringify(payload, null, 2)}`}, { quoted: msg });
 return client.editMessage(from, mess.key.id, 'Success');
 } else {
 clearInterval(pollingInterval[date]);
 global.queue.delete(order.slice(1) + msg.sender);
 return client.editMessage(from, mess.key.id, data);
 }
 }
 } catch (error) {
 clearInterval(pollingInterval[date]);
 global.queue.delete(order.slice(1) + msg.sender);
 return client.editMessage(from, mess.key.id, 'Error:' + error.message);
 }
 }

 const pollingIntervall = 2000;
 pollingInterval[date] = setInterval(checkStatus, pollingIntervall);

 } catch (error) {
 global.queue.delete(order.slice(1) + msg.sender);
 return client.editMessage(from, mess.key.id, 'Error:' + error.message);
 }
 }
};