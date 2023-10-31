//○Created by rifza.p.p
const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

async function getInfo(url) {
	let result = {
		message: 'success',
		title: null,
		video: null,
		image: null,
		user: null
	}
	let data = await axios.get(url)
	let regexTitle = /<title data-rh="true">(.*?)<\/title>/
	let regexUserInfo = /{"users":\s*({[^}]+}+})/
	let userInfo = await data.data.match(regexUserInfo)[1]
	let title = await data.data.match(regexTitle)[1]

	const parseuser = Object.values(JSON.parse(userInfo))[0]

	result.user = parseuser
	result.title = title

	return result
}

exports.tiktokdl = async (url) => {
	return new Promise(async (resolve, reject) => {
		let result =  {}
		let regex = /<img\s*alt\s*src="\s*([^"\s]+)/g
		let regx = /<source\s*src="\s*([^"\s]+)/g
		axios.get("https://dlpanda.com/?url=" + url + "&token=G7eRpMaa")
			.then(response => {

				let dataVid = response.data.match(regx);
				let dataImg = response.data.match(regex);

				if (dataVid !== null) {
					let regxvid = /<source\s*src="\s*/
					let vid = []
					for (let match of dataVid) {
						let replace = match.replace(regxvid, "")
						vid.push(replace)
					}
					result.video = vid
				} else if (dataImg !== null) {
					let regximg = /<img\s*alt\s*src="\s*/
					let img = []
					for (let match of dataImg) {
						let replace = match.replace(regximg, "")
						img.push(replace)
					}
					result.image = img
				} else {
					result.message = 'Not supported this Url'
				}
				resolve(result)
			})
	})
}