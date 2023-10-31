//○ Create by @rifza.p.p
const fs = require("fs")
const axios = require("axios")
const cheerio = require("cheerio")

let baseUrl = "https://saveinsta.io"

const getMediaType = async (url) => {
  return new Promise(async(resolve, reject) => {
  let get = await axios.get(url)
  let c = get.headers['content-disposition']
  let type = c.includes('.mp4') ? 'video' 
             : c.includes('.jpeg') ? 'image' 
             : c.includes('.jpg') ? 'image'
             : c.includes('.png') ? 'image'        
             : c.includes('.gif') ? 'gif'        
             : null  
  resolve(type)
  })
}
exports.saveInsta = async (url) => {
  return new Promise(async(resolve, reject) => {
    let res = { status: false }
    const post = await axios.request({
      url: baseUrl + "/core/ajax.php",
      method: "POST",
      data: new URLSearchParams(
          Object.entries({
        url: url,
        host: "instagram"
      })),
      headers: {
       'content-type': 'application/x-www-form-urlencoded',
      }
    })
    let $ = cheerio.load(post.data)
    let medias = []
    let promises = $(".col-md-8").map(async(index, element) => {
    let media = {}
    media.url = baseUrl + '/' + $(element).find('a').attr('href')
    media.type = await getMediaType(media.url)
    medias.push(media)
    }).get()
    await Promise.all(promises)
    res.medias = medias
    res.status = medias.length > 0
    resolve(res)
  })
}

//exports.saveInsta("https://www.instagram.com/reel/CvnbHu1OEwh/?igshid=NTc4MTIwNjQ2YQ==").then(a => console.log(a))