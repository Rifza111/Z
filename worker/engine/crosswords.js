/* TEKA-TEKI SILANG GENERATOR✨️
   * FULL KETIK OLEH RIFZA
   * CREATOR : RIFZA
   * Thanks to :
      - Allah SWT.
      - Rifza
      - Axios
      - Cheerio
      - puzzlemaker discoveryeducation
      - SEMUA ORANG DI MUKA BUMI DAN DILUAR PLANET
*/

const axios = require("axios")
const cheerio = require("cheerio")


exports.crosswords = async (words) => {
  return new Promise(async(resolve, reject) => {
   
   var hasil  

   let param = {
             puzzle_height: 50,
             puzzle_width: 50,
             puzzle_size: 30,
             title: 'CROSSWORD MAKER BY RIFZA',
             words: words,
             show_instructions: 'ON'
            }
            
   let headers = {
                  "cookie": "_ga=GA1.2.1742875890.1678613837; _gid=GA1.2.1341990674.1678613837; _gat_gtag_UA_24212317_28=1",
                  "user-agent": "Mozilla/5.0 (Linux; Android 13; SM-M127F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
                  "upgrade-insecure-request": 1,
                  "origin": "https://puzzlemaker.discoveryeducation.com",
                  "referer": "https://puzzlemaker.discoveryeducation.com/criss-cross"
                }
                
   let working = await axios({
      url: "https://puzzlemaker.discoveryeducation.com/criss-cross/result",
      method: "post",
      data: new URLSearchParams(Object.entries(param)),
      headers: headers
    })
    var $ = cheerio.load(working.data)     
     $("#pzl").each(function(a, z) {
   	  const img1 = $(z).find('img').attr('src')
   	  const img2 = $(z).find('img').attr('src').replace('GmgcRSwlC5WhX5RVrEMFDQ%3d%3d', 'TsgqUsAShtQDPHTQHCid3A%3d%3d')
   	  hasil = {    	    
   	      hide_answers: 'https://puzzlemaker.discoveryeducation.com' + img1,
   	      show_answers: 'https://puzzlemaker.discoveryeducation.com' + img2
   	     }
   	     
	 })	    
     resolve(hasil)
    
   })
}