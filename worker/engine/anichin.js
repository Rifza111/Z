let baseUrl = "https://anichin.top"
const axios = require('axios')
const fs = require('fs')
const cheerio = require('cheerio')

const anichinSearch = async (query) => {
	return new Promise(async (resolve, reject) => {
		let res = {
			results_found: 0,
			data: []
		}
		let search = await axios.get(baseUrl, {
			params: {
				s: query
			}
		})
		const $ = cheerio.load(search.data)
		$('.listupd .bs').each((index, element) => {
			res.results_found = res.results_found + 1
			let data = {}
			data.title = $(element).find('.bsx a').attr('title')
			data.status = $(element).find('.bt .epx').text()
			data.type = $(element).find('.limit .typez').text()
			data.url = $(element).find('.bsx a').attr('href')
			data.imgUrl = $(element).find('img').attr('src')
			res.data.push(data)
		})
		resolve(res)
		 
	})
}

const anichinGetEps = async (url) => {
	return new Promise(async (resolve, reject) => {
		let res = {}
		let get = await axios.get(url)
		const $ = cheerio.load(get.data)
		res.author = Buffer.from("QHJpZnphLnAucA==", "base64").toString("ascii")
		res.title = $('.entry-title').text().trim()
		res.imageUrl = $('.ime img').attr('data-lazy-src').trim()
		res.status = $('span:contains("Status:")').text().replace('Status:', '').trim()
		res.rating = $('.rating strong').text().trim()
		res.dirilis = $('span:contains("Dirilis:")').text().replace('Dirilis:', '').trim()
		res.durasi = $('span:contains("Durasi:")').text().replace('Durasi:', '').trim()
		res.studio = $('span:contains("Studio:") a').text().trim()
		res.network = $('span:contains("Network:") a').text().trim()
		res.negara = $('span:contains("Negara:") a').text().trim()
		res.tipe = $('span:contains("Tipe:")').text().replace('Tipe:', '').trim()
		res.episode = $('span:contains("Episode:")').text().replace('Episode:', '').trim()
		res.fansub = $('span:contains("Fansub:")').text().replace('Fansub:', '').trim()
		res.posted_by = $('span:contains("Diposting oleh:")').text().replace('Diposting oleh:', '').trim()
		res.add = $('span:contains("Ditambahkan:")').text().replace('Ditambahkan:', '').trim()
		res.edited = $('span:contains("Terakhir diedit:")').text().replace('Terakhir diedit:', '').trim()
		let genres = []
		$('.genxed a[rel="tag"]').each((index, element) => {
			genres.push($(element).text().trim())
		})
		res.genres = genres.join(', ')
		res.sinopsis = $('.entry-content p').eq(0).text().trim()
		res.note = $('.entry-content p').eq(1).text().trim()
		const episodes = []

		$('.eplister li').each((index, element) => {

			const episode = {}
			const link = $(element).find('a')
			episode.url = link.attr('href')
			episode.number = link.find('.epl-num').text().trim()
			episode.name = link.find('.epl-title').text().trim()
			episode.date = link.find('.epl-date').text().trim()

			episodes.push(episode)

		})
	  	res.episodes = episodes
		
		resolve(res)
		//  fs.writeFileSync('anichin.html', get.data)
	})
}
//https://ok.ru/video/6078460529330
//https://ok.ru/videoembed/6078460529330
//anichinSearch('tang').then(a => console.log(a))
//anichinGetEps('https://anichin.top/soul-land-2-the-unrivaled-tang-sect/').then(a => console.log(a)

//axios.get('https://anichin.top/soul-land-2-the-unrivaled-tang-sect-episode-01-subtitle-indonesia/').then(a => fs.writeFileSync('./anichin.html', a.data))