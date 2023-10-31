const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.expertsphp.com/instagram-reels-downloader.php';

exports.twitDl = async(tweetUrl)=>{
return new Promise(async (resolve, reject) => {
const result = []

axios({
  url: url,
  method: "POST",
  data: { url: tweetUrl },
  headers: {
  'origin': 'https://www.expertsphp.com',
  'referer': 'https://www.expertsphp.com/twitter-video-downloader.php'
  }
})
  .then(response => {
     const $ = cheerio.load(response.data);

    $('video').each((index, element) => {
      const videoSrc = $(element).attr('src');
      result.push(videoSrc);
    });
    resolve(result)
  })
  .catch(error => {
    console.error(error);
  });
 })
}