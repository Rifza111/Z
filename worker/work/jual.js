 const {
 	addInventory,
 	checkInventory,
 	getInventory,
 	addCoin,
 	kurangCoin,
 	getCoin,
 	addDarah,
 	kurangDarah,
 	getDarah,
 	addBesi,
 	kurangBesi,
 	getBesi,
 	addEmas,
 	kurangEmas,
 	getEmas,
 	addEmerald,
 	kurangEmerald,
 	getEmerald,
 	addUmpan,
 	kurangUmpan,
 	getUmpan,
 	addPotion,
 	kurangPotion,
 	getPotion
 } = require('../../lib/inventory')


 module.exports = {
 	order: ['sell', 'jual'],
 	tags: 'RPG',
 	command: ['jual'],
 	maintenance: false,
 	owner: false,
 	co_owner: false,
 	group: false,
 	groupAdmins: false,
 	botGroupAdmins: false,
 	quotedVideo: false, //quotedVideo: "pesannya"
 	quotedImage: false, //quotedImage: "pesannya"
 	quotedAudio: false, //quotedAudio: "pesannya"
 	premium: false, //true/false
 	coin: false, //coin: "normal"
 	quoted: false, //quoted: "pesannya"
 	quotedSticker: false, //quotedSticker: "pesannya"
 	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
 	quotedUrl: false,
 	exec: async (msg, client, from, {
 		q,
 		args,
 		order,
 		prefix
 	}) => {
 		if (!q) return msg.reply(`Mau jual apa?\n*anda bisa yang ada di list berikut*\n> *besi* _( Harga/batang : 16000 coin )_\n> *emas* _( Harga/batang : 50000 coin )_\n> *emerald* _( Harga/biji : 100000 coin )_\n\n_Example : ${order} ikan 15_`)
 let count;
 async function getJumlahBarang(sender, jenisBarang) {

    switch (jenisBarang) {
      case "besi":
        count = await getBesi(sender);
        break;
      case "emas":
        count = await getEmas(sender);
        break;
      case "emerald":
        count = await getEmerald(sender);
        break;
      default:
        count = 0; 
    }
    return count    
} 		

 		async function kurangBarang(sender, jenisBarang, jumlah) {
 			switch (jenisBarang) {
 				case "besi":
 					await kurangBesi(sender, jumlah)
 					return
 					break;
 				case "emas":
 					await kurangEmas(sender, jumlah)
 					return
 					break;
 				case "emerald":
 					await kurangEmerald(sender, jumlah)
 					return
 					break;
 			}
 		}

 		async function transaksiBarang(jenisBarang, hargaBarang) {
 			if (args.length < 2) {
 				return msg.reply(`Contoh: ${order} ${jenisBarang} 2\n1 ${jenisBarang} = ${hargaBarang} coin`);
 			}

 			const jumlah = parseInt(args[1]);
 			if (isNaN(jumlah)) {
 				return msg.reply(`Harus berupa angka! Contoh: ${order} ${jenisBarang} 15`);
 			}

 			if (jumlah <= 0) {
 				return msg.reply(`Jumlah harus lebih dari 0.`);
 			}

 			const totalHarga = hargaBarang * jumlah;
 		    let getjumlh = await getJumlahBarang(msg.sender, jenisBarang)
 			if (getjumlh < jumlah) {
 				return msg.reply(`${jenisBarang} anda tidak mencukupi untuk transaksi ini`);
 			}

 			await kurangBarang(msg.sender, jenisBarang, jumlah);
 			await addCoin(msg.sender, totalHarga);
 		    let getjumlah = await getJumlahBarang(msg.sender, jenisBarang)
 			console.log(getjumlah)
 			setTimeout(() => {
 				msg.reply(`Transaksi berhasil ✔️\n*Hasil penjualan* : ${totalHarga}\n*🪙Coin anda* : ${getCoin(msg.sender)}\n*Sisa ${jenisBarang} anda* : ${getjumlah}`);
 			}, 2000);
 		}

 		const jenisBarang = args[0].toLowerCase();

 		switch (jenisBarang) {
 			case "besi":
 				transaksiBarang("besi", 200);
 				break;
 			case "emas":
 				transaksiBarang("emas", 500);
 				break;
 			case "emerald":
 				transaksiBarang("emerald", 900);
 				break;
 			default:
 				msg.reply(`Kata kunci tidak ditemukan\n\n> *besi* _( Harga/batang : 200 coin )_\n> *emas* _( Harga/batang : 500 coin )_\n> *emerald* _( Harga/biji : 900 coin )_\n\n_Example : ${order} besi 15_`);
 		}

 	}
 }