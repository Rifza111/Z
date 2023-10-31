const SETTING = require('../../validator/config')
const {
	addInventory,
	checkInventory,
	addCoin,
	kurangCoin,
	getCoin
} = require('../../lib/inventory')

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function checkHorizontal(matrix) {
	for (let row of matrix) {
		if (row[0] === row[1] && row[1] === row[2]) {
			return true
		}
	}
	return false
}

function checkVertical(matrix) {
	for (let col = 0; col < 3; col++) {
		if (matrix[0][col] === matrix[1][col] && matrix[1][col] === matrix[2][col]) {
			return true
		}
	}
	return false
}

function checkAllSame(matrix) {
	const firstElement = matrix[0][0]
	for (let row of matrix) {
		for (let element of row) {
			if (element !== firstElement) {
				return false
			}
		}
	}
	return true
}

function checkMiddleRow(matrix) {
	const middleRow = matrix[1]
	return middleRow[0] === middleRow[1] && middleRow[1] === middleRow[2]
}

/*
Syarat Menang:
BIG WIN: Jika semua simbol pada layar adalah sama.
Kemenangan Baris Tengah: Jika simbol pada baris tengah (vertikal) semua sama.
Kemenangan Horizontal: Jika simbol pada baris mana pun pada satu kolom semua sama.
Kemenangan Vertikal: Jika simbol pada kolom mana pun pada satu baris semua sama.

Poin:
BIG WIN: x10 poin awal pemain.
Kemenangan Baris Tengah: x7 poin awal pemain.
Kemenangan Horizontal atau Vertikal: x3 poin awal pemain untuk setiap kemenangan.
*/

module.exports = {
	order: ['slot2'],
	tags: 'game',
	command: ['slot2'],
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
	quoted: 'Contoh : .slot 200', //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
		const coinAmount = parseInt(q)
     	const spins = 7
		const symbols = ["🐋", "🐬", "🐠", "🦞"]
		let prize = 0 
		let horizontalWins = 0
		let verticalWins = 0
	if (!checkInventory(msg.sender)) {
			await addInventory(msg.sender)
    }

	let senderCoin = await getCoin(msg.sender)
	if(coinAmount < 50) return msg.reply("Coin minimum adalah 50!")
    if(senderCoin < coinAmount) return msg.reply(`Coin kamu tidak cukup!\nKamu hanya memiliki 🪙${senderCoin} coin\nJumlah koin yang kurang : ${senderCoin - coinAmount}`)

	let text = `👑GAME SLOT 👑`
		await kurangCoin(msg.sender, coinAmount)   
	    let proces = await client.sendMessage(from, {
			text: text + `Memulai game slot untuk menjudikan ${q} 🪙coin`
		}, {
			quoted: msg
		})
		
		
		async function spinSlots(spins, symbols) {
			let results = []
			for (let spin = 1; spin <= spins; spin++) {
				results = []
				const slots = []
				for (let row = 0; row < 3; row++) {
					const slotRow = []
					for (let col = 0; col < 3; col++) {
						const randomIndex = Math.floor(Math.random() * symbols.length)
						slotRow.push(symbols[randomIndex])
					}
					slots.push(slotRow)
				}
				let edittedSlot = `\n\n`
                   for (const slotRow of slots) {
                      edittedSlot += `[${slotRow.join('][')}]\n`
         			}
               
				let textt = text + edittedSlot
				results = slots
				await client.editMessage(from, proces.key.id, textt)
				await sleep(2000)
			}
			return results
		}



		async function Slot() {


			console.log("Memutar slot...")
			let spin = await spinSlots(spins, symbols)
			console.log(spin)
			let edittedSlot = `\n\n Hasil spin : \n`
				
			       for (const slotRow of spin) {
                      edittedSlot += `[${slotRow.join('][')}]\n`
                   }
                
			let textt = text + edittedSlot
            await client.editMessage(from, proces.key.id, textt)
			if (checkHorizontal(spin)) {
				horizontalWins++
			}
			if (checkVertical(spin)) {
				verticalWins++
			}

			const allSame = checkAllSame(spin)
			const middleRowMatch = checkMiddleRow(spin)

		
			if (allSame) {
				const multiplier = 10
				const points = coinAmount * multiplier
				textt += `\nAnda mendapatkan BIG WIN dengan poin ${points} karena semua elemen sama!`
				prize += points
			} else if (middleRowMatch) {
				const multiplier = 7
				const points = coinAmount * multiplier 
				textt += `\nAnda mendapatkan poin ${multiplier}x lipat karena sebaris di tengah!`
				prize += points
			}

			if (horizontalWins > 0 || verticalWins > 0) {
				const multiplier = 3
				let winMessage = ""
				if (horizontalWins > 0 && verticalWins > 0) {
					winMessage = `horizontal dan vertikal`
				} else if (horizontalWins > 0) {
					winMessage = `horizontal`
				} else if (verticalWins > 0) {
					winMessage = `vertikal`
				}
				const totalWins = horizontalWins + verticalWins
				const points = coinAmount * multiplier * totalWins // Poin untuk kemenangan horizontal atau vertikal
				textt += `\nAnda mendapatkan poin ${multiplier}x (${totalWins} kemenangan ${winMessage}) karena kesamaan ${winMessage}!`
				prize += points
			}

			textt += `\n\nTotal coin hasil judi Anda: ${prize}`
        	textt += `\n\nSisa coin anda: ${await getCoin(msg.sender)}`
			if(prize == 0) { textt += `\n\n*Maaf kamu tidak dapat hadiah karena kalah!*\n\nSyarat Menang:

BIG WIN: Jika semua simbol pada layar adalah sama.
Kemenangan Baris Tengah: Jika simbol pada baris tengah (vertikal) semua sama.
Kemenangan Horizontal: Jika simbol pada baris mana pun pada satu kolom semua sama.
Kemenangan Vertikal: Jika simbol pada kolom mana pun pada satu baris semua sama.
Poin:

BIG WIN: x10 poin awal pemain.
Kemenangan Baris Tengah: x7 poin awal pemain.
Kemenangan Horizontal atau Vertikal: x3 poin awal pemain untuk setiap kemenangan.
`
}
			await addCoin(msg.sender, parseInt(prize))
			msg.reply(textt)
		}

		Slot()

	}
}