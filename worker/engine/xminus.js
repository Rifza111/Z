/**==================================!
 ○ Create by @rifza.p.p
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
 !!!           DOKUMEN ASLI DARI RIFZA               !!!
 !!! pake aja tpi jan ganti nama gw sama tqto nya 😶 !!!
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  🩵 Follow ️me on :
      ▪︎ https://youtube.com/@rifza  
      ▪︎ https://github.com/Rifza123
      ▪︎ https://instagram.com/rifza.p.p?igshid=ZGUzMzM3NWJiOQ==
      ▪︎ https://www.threads.net/@rifza.p.p

 ♡Thanks To :
      ▪︎ Penyedia module
      ▪︎ X-Minus Pro
      ▪︎ Diri sendiri
      ▪︎ All     
                               
!===================================*/

const fs = require("fs")
const axios = require("axios")
const FormData = require('form-data')
const cheerio = require('cheerio')

/** Example result :
  vocal : 
https://m4.xmstatic.org/dl/vocalCutAi?job-id=23628103181690566230cc66777c53cb8a0e38f8c8c5fefc9eea&quality=normal&stem=vocal&fmt=mp3&similar-job-id=236281031816905559800d72e985adeb0248ab83a88405b3bb9a&trackname=y.mp3
  instrument: https://m4.xmstatic.org/dl/vocalCutAi?job-id=23628103181690559313eee288555d2f073df8ded407000040fd&quality=normal&stem=inst&fmt=mp3&similar-job-id=236281031816905559800d72e985adeb0248ab83a88405b3bb9a&trackname=y.mp3
*/

function generateRandomLetters(length) {
	let result = ''
	const alphabetLength = 26

	for (let i = 0; i < length; i++) {
		const randomValue = Math.floor(Math.random() * alphabetLength)
		const randomLetter = String.fromCharCode('a'.charCodeAt(0) + randomValue)
		result += randomLetter
	}

	return result
}

async function getVocalCutAuthKey() {
	return new Promise(async (resolve, reject) => {

		const response = await axios.get('https://x-minus.pro/ai')
		const $ = cheerio.load(response.data)
		const vocalCutAuthKey = $('#vocal-cut-auth-key').val()
		resolve(vocalCutAuthKey)

	})
}


exports.vocalCutAi = async (mp3) => {
	return new Promise(async (resolve, reject) => {
		let res = {
			status: null
		}
		let key = await getVocalCutAuthKey()
		let name = Math.floor(Math.random() * 100000000000000000) + await generateRandomLetters() + '.mp3'	
		const getData = await axios({
			url: "https://m4.xmstatic.org/upload/vocalCutAi?catch-file",
			method: "POST",
			data:  {
              auth_key: key,
              locale: 'en_US',
              separation: 'inst_vocal',
              format: 'mp3',
              version: '3-4-0',
              model: 'mb2lf',
              aggressiveness: "2",
              show_setting_format: "0",
              hostname: 'x-minus.pro',
              client_fp: '-',
              myfile: mp3 
            },
			headers: {
				'Content-Type': `multipart/form-data`,
			},
		})
		let vocal = `https://m4.xmstatic.org/dl/vocalCutAi?job-id=${getData.data.job_id}&quality=normal&stem=vocal&fmt=mp3&similar-job-id=${getData.data.similar_job_id}&trackname=${getData.data.source_filename}.mp3`
		let instrument = `https://m4.xmstatic.org/dl/vocalCutAi?job-id=${getData.data.job_id}&quality=normal&stem=inst&fmt=mp3&similar-job-id=${getData.data.similar_job_id}&trackname=${getData.data.source_filename}.mp3`
		res.vocal = vocal
		res.instrument = instrument
		resolve(res)
	})
}