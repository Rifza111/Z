/*
* SCRAPER BY YANZBOTZ X BG RIPZA🥰
*/
const axios = require("axios")
const cheerio = require("cheerio")
const fetch = require('node-fetch')
const fs = require('fs')
async function getType(url){//@rifza.p.p
  return new Promise(async(resolve, reject) => {    
    axios.get(url).then(a => {
       if(a.data.includes('-i-photomode-')){
         resolve('image')
       } else {
         resolve('video')
       }
    })
  })
}


exports.tiktokDl = async(url) => {//get info and image by yanzbot
   return new Promise(async(resolve, reject) => {//convert to multi (support get slide or video) by @rifza.p.p
     let type = await getType(url)
     let get = await axios({
        url: "https://ttsave.app/download",
        method: "POST",
        params: {
          mode: type == "image" ? "slide" : "video",
          key: "fd0b2ca4-9e40-494f-8aa0-c2ef49ebdf7a"
         },
        data: { id: url },
        headers: {
          cookie: "_ga=GA1.1.400954666.1690542590; __gads=ID=52e69b210203b355-22a78221518000c4:T=1690542589:RT=1690542929:S=ALNI_MbELANaSOTLC-HTjYreFth8BjJ2YQ; __gpi=UID=00000d26bdb0db93:T=1690542589:RT=1690542929:S=ALNI_MZoZLkziMBGSpJ4yhS-BHtrmMBClQ; _ga_1CPHGEZ2VQ=GS1.1.1691390659.5.0.1691390665.0.0.0; cf_clearance=FnOdpkHzyYxCSwyhdGoE15VqxJ70qI6qLoiM6DC2F4o-1697118633-0-1-e29bd497.75875238.c811983d-0.2.1697118633",
          "user-agent": "Mozilla/5.0 (Linux; Android 13; SM-M127F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36"
        }
        })    
     const $ = cheerio.load(get.data)
     fs.writeFileSync('tiktokdl.html', get.data)
       const res = {
         type: type,
         name: $("h2").text(),
         username: $('a.font-extrabold.text-blue-400.text-xl').text().trim(),
         profile: $(".flex.flex-col.justify-center.items-center > img").attr("src"),
         views: $('.flex.flex-row.items-center.justify-center div:nth-child(1) span').text().trim(),
         likes: $('.flex.flex-row.items-center.justify-center div:nth-child(2) span').text().trim(),
         comments: $('.flex.flex-row.items-center.justify-center div:nth-child(3) span').text().trim(),
         favorite: $('.flex.flex-row.items-center.justify-center div:nth-child(4) span').text().trim(),
         shares: $('.flex.flex-row.items-center.justify-center div:nth-child(5) span').text().trim(),
         sound: $('div#button-download-ready .flex.flex-row.items-center.justify-center.mt-5.w-3/4 span').text().trim(),
         description: $("p").text().trim(),
       };

         if (res.type === 'video') {
           const videoUrl = {};
             $('div#button-download-ready a').each((index, element) => {
               const link = $(element).attr('href');
               console.log(link)
               const type = $(element).attr('type');
               videoUrl[type] = link;
             });
           res.video = videoUrl;
         }

         if (res.type === 'image') {
            const imageUrl = [];
            $('div#button-download-ready a[type="slide"]').each((index, element) => {
               imageUrl.push($(element).attr('href'));
            });
          res.image = imageUrl;
         }
resolve(res);
      })
}

/*
* SCRAPER BY YANZBOTZ X BG RIPZA🥰
*/