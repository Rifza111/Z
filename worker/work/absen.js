module.exports = {
	order: ['absen'],
	maintenance: false,
	owner: false,
	group: true,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: false, //quotedImage: "pesannya"
	quotedAudio: false, //quotedAudio: "pesannya"
	premium: false, //true/false
	quoted: false, //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	 let text = q.split("|")
	 let text2 = q.split("|")[1]
 if (text[0] == "start"){
 if ((from in global.absen)) return msg.reply("Masih ada absen yang berlangsung disini!!\nKetik _#absen stop_ untuk menghapus absen!")
 if(!text) return msg.reply("Contoh: #absen start|Kelas XII MIPA III")
 if(!text1) return msg.reply("Contoh: #absen start|Kelas XII MIPA III")
 global.absen[from] = [[], text[1]] 
 msg.reply("Berhasil memulai absen!\nSilahkan ketik _#absen <nama kalian>_ agar terdaftar di list absen")
 } else if(text[0] == "stop"){
 if (!(from in global.absen)) return msg.reply(`Tidak ada absen yang sedang berlangsung!\nSilahkan ketik #absen start|teks\nContoh:\nMemulai absen : _${order} start|Absen kelas 10_\nAbsen: _${order} nama kalian_\nMenghapus absen: _${order} stop_`)
 delete global.absen[from]
 msg.reply("Berhasil menghapus absen!")
 } else if(text[0] == "cek"){
 if (!(from in global.absen)) return msg.reply(`Tidak ada absen yang sedang berlangsung!\nSilahkan ketik #absen start|teks\nContoh:\nMemulai absen : _${order} start|Absen kelas 10_\nAbsen: _${order} nama kalian_\nMenghapus absen: _${order} stop_`)
 let list = global.absen[from][0].map((a, z) => ` ▪︎ ${z + 1}. ${a.name}`).join('\n')

 let d = new Date
 let date = d.toLocaleDateString('id', {
 day: 'numeric',
 month: 'long',
 year: 'numeric'
 })
 let text = `*[ A B S E N ]*\n\n*Date:* _${date}_\n\n${"```" + global.absen[from][1] + "```"}\n\n[ *List data absen:* ]\n\n- *Total:* ${global.absen[from][0].length}\n${list}` 
 msg.reply(text) 
 } else {
 if (!(from in global.absen)) return msg.reply(`Tidak ada absen yang sedang berlangsung!\nSilahkan ketik #absen start|teks\nContoh:\nMemulai absen : _${order} start|Absen kelas 10_\nAbsen: _${order} nama kalian_\nMenghapus absen: _${order} stop_`)
 if(global.absen[from][0].find(item => item.id === msg.sender)) return msg.reply("Kamu sudah absen!")
 if(!q) return msg.reply("Jangan lupa sertakan namamu agar terdaftar dalam list absen!")
 global.absen[from][0].push({ name: q, id: msg.sender })
 let list = global.absen[from][0].map((a, z) => ` ▪︎ ${z + 1}. ${a.name}`).join('\n')

 let d = new Date
 let date = d.toLocaleDateString('id', {
 day: 'numeric',
 month: 'long',
 year: 'numeric'
 })
 let text = `*[ A B S E N ]*\n\n*Date:* _${date}_\n\n${"```" + global.absen[from][1] + "```"}\n\n[ *List data absen:* ]\n\n- *Total:* ${global.absen[from][0].length}\n${list}` 
 msg.reply(text) 
 }
	}
}