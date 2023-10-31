const axios = require("axios")
const cheerio = require('cheerio')
let baseUrl = "https://ytmp4.page/models/process.php"

function sleep(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
}

const downloadYouTube = async(url) => {
return new Promise(async(resolve, reject) => {
 const mp3Options = [];
 const mp4Options = [];

 let payload = { 
 type: "all",
 search_txt: url 
 }
 
 let post = await axios.request({
 url: baseUrl,
 data: new URLSearchParams(Object.entries(payload)),
 method: 'POST'
 })

 const $ = cheerio.load(post.data)
 let res = {}
 res.title = $(".media-heading").text().trim()
 res.duration = $(".video_duration").text().trim()
 res.img = $('.media-object.img-thumbnail').attr('src');
 
 $('optgroup[label="MP3"] option').each((index, element) => {
 const option = $(element);
 const size = option.attr('data-size');
 const hash = option.attr('data-hash');
 const bitrate = option.text().trim();

 mp3Options.push({
 size,
 hash,
 bitrate,
 });
 });

 $('optgroup[label="MP4"] option').each((index, element) => {
 const option = $(element);
 const size = option.attr('data-size');
 const hash = option.attr('data-hash');
 const bitrate = option.text().trim();

 mp4Options.push({
 size,
 hash,
 bitrate,
 });
 });

 res.mp3 = mp3Options
 res.mp4 = mp4Options
 resolve(res)
})
}

const starTask = async(hash) => {
 return new Promise(async(resolve, reject) => {
 
 let payload = { 
 hash: hash
 }
 
 let post = await axios.request({
 url: "https://ytmp4.page/models/startTask.php",
 data: new URLSearchParams(Object.entries(payload)),
 method: 'POST'
 })
 
 resolve(post.data)
 
 })
}

const taskStatus = async(taskId) => {
 return new Promise(async(resolve, reject) => {
 
 let payload = { 
 taskId: taskId
 }
 
 let post = await axios.request({
 url: "https://ytmp4.page/models/taskStatus.php",
 data: new URLSearchParams(Object.entries(payload)),
 method: 'POST'
 })
 
 resolve(post.data)
 
 })
}

module.exports = {
	order: ['ytaudio'],
	tags: 'downloader',
	command: [ 'ytaudio'],
	quoted: 'linknya?',
	coin: 'ytaudio',
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	await sleep(1000)
 let pollingInterval = {}; 
 let date = new Date() * 1
 let proces = await client.sendMessage(from, { text: `Please wait.......` },{quoted:msg})
 
 try {
 
 const mp4 = await downloadYouTube(q)

 let size = mp4.mp4[1].size
 let bitrate = mp4.mp4[1].bitrate

 const start = await starTask(mp4.mp4[1].hash)
 
 const checkStatus = async(taskid) => {
 let progress = await taskStatus(start) 
 let text = `* [! YOUTUBE AUDIO !]*`
 text += `\n\nTitle: ${progress.title}`
 text += `\nStatus: ${progress.status}`
 text += `\nQuality: ${bitrate}`
 text += `\nSize: ${size}`
 text += `\nConvert Progress: ${progress.convert_progress}%`
 text += `\nDownload Progress: ${progress.download_progress}%`
 
 if(progress.status == "finished"){
 clearInterval(pollingInterval[date])
 let download = progress.download
 await client.editMessage(from, proces.key.id, text) 
 let vid = { audio: { url: download }, mimetype: 'audio/mpeg' }
 return client.sendMessage(from, vid, { quoted : msg })
 } else {
 return client.editMessage(from, proces.key.id, text)
 }
 } 
 
 const pollingIntervall = 2000;
 pollingInterval[date] = setInterval(checkStatus, pollingIntervall);

 } catch(e) { client.editMessage(from, proces.key.id, `Type-Err! :\n${e}`) }


//downloadYouTube("https://youtu.be/YHtIrKef-zU").then(a => console.log(a)) 
	}
}