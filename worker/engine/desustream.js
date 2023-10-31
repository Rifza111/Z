const axios = require("axios")
const getBuffer = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (e) {
        console.log(`Error : ${e}`)
        return 'err'
    }
}
exports.desuStream = async(url) => {
	let result = {}
	let data = await axios.get(url)
	let regexUrlVideo = /{'file':'(.*?)','type':'video\/mp4'}]/
	let regexImage = /image: "(.*?)"/
	let urlVideo = await data.data.match(regexUrlVideo)[1]
	let image = await data.data.match(regexImage)[1]
	
	result.url = urlVideo
	result.image = image
	return result
}
exports.desuStream('https://desustream.me/moedesu/stream/?id=bXM3RnR5S0J2YUpINndtQzFwUTNFTGtaMlFsRXRKZUJMT05RZW1FOGdacz0=').then(a => console.log(a))