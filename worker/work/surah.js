module.exports = {
	order: ['surah'],
	tags: 'religion',
	command: ['surah'],
	maintenance: false,
	coin: false,
	quoted: false,
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	quotedImage: false,
	quotedAudio: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	const sendSurah = (surahnya) => {
       const surah = require(["../../lib/container/database/surah/"] + [surahnya] + [".json"]);
         let quran = `Surah📖: ${surah.name}\nDiturunkan di kota: ${surah.type}\nJumlah Ayat: ${surah.number_of_ayah}\n\n\n`     
           for (let surahh of surah.verses) {
             quran += `${surahh.number}\n${surahh.text}\n${surahh.translation_id}\n\n`
           }    
      msg.reply(quran)      
    }

	let surah = ["al-fatihah","al-baqarah","al-imran","an-nisa","al-ma'ida","al-an'am","al-a'raf","al-anfal","al-tawba","yunus","hud","yusuf","ar-ra'd","ibrahim","al-hijr","an-nahl","al-isra","al-kahf","maryam","taha","al-anbiya","al-hajj","al-muminun","an-nur","al-furqan","ash-shuara","an-naml","al-qasas","al-ankabut","ar-rum","luqman","as-sajdah","al-ahzab","saba","fatir","yasin","as-saffat","sad","az-zumar","ghafir","fussilat","ash-shura","az-zukhruf","ad-dukhan","al-jathiya","al-ahqaf","muhammad","al-fath","al-hujurat","qaf","az-zariyat","al-tur","an-najm","al-qamar","ar-rahman","al-waqia","al-hadid","al-mujadilah","al-hashr","al-mumtahinah","as-saff","al-jumuah","al-munafiqun","at-taghabun","at-talaq","at-tahrim","al-mulk","al-qalam","al-haqqah","al-maarij","Nuh","al-jinn","al-muzzamil","al-muddaththir","al-qiyamah","al-insan","al-mursalat","an-naba","an-Naziat","abasa","at-takwir","al-infitar","al-mutaffifin","al-inshiqaq","al-buruj","al-tariq","al-ala","al-ghashiyah","al-fajr","al-balad","ash-shams","al-lail","ad-duha","ash-sharh","at-tin","al-alaq","al-qadr","al-bayinah","al-zalzalah","al-adiyat","al-qariah","al-takasurr","al-asr","al-humazah","al-fil","quraish","al-maun","al-kautsar","al-kafirun","an-nasr","al-masad","al-ikhlas","al-falaq","an-nas"]
    if(!surah.includes(args[0])) return msg.reply('*Surah tidak ditemukan!*\n_silahkan lihat list surah berikut :_\n\n' + surah.join('\n') + '\n\n_Example : .surah yasin_')	
    const target = args[0]
    const getSurah = surah.findIndex(item => item.toLowerCase() === target.toLowerCase()) + 1;
    await sendSurah(getSurah)
	}
}