let axios = require("axios")
let cheerio = require("cheerio")
const BodyForm = require('form-data')
       
let gifToMp4 = async(url) => {
  return new Promise(async(resolve, reject) =>{
   const form = new BodyForm()
        form.append('new-image-url', url)
        form.append('new-image', '')
    let { data } = await axios(
      { 
        url: 'https://ezgif.com/gif-to-mp4',
        method: 'post',
        data: form,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${form._boundary}`
        }
      })
    
    const FormThen = new BodyForm()
            const $ = cheerio.load(data)
            const file = $('input[name="file"]').attr('value')
            FormThen.append('file', file)
            FormThen.append('convert', "Convert GIF to MP4!")
    let giftomp4 = await axios({
                method: 'post',
                url: 'https://ezgif.com/gif-to-mp4/' + file,
                data: FormThen,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${FormThen._boundary}`
                }
            })
    const $$ = cheerio.load(giftomp4.data)
    const result = 'https:' + $$('div#output > p.outfile > video > source').attr('src')
    
    resolve(result)
  })  
}

module.exports = { gifToMp4 }