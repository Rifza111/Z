const { vits } = require('../engine/vits')
module.exports = {
	order: ["saiba_momoi","narsume_iroha","misono_mika","kasumizawa_miyu","shirasu_azusa","tendou_alice","sunaookami_shiroko","sorasaki_hina","shiromi_iori","kuda_izuna","hayase_yuuka"],
	tags: 'bluearchive',
	command: ["saiba_momoi","narsume_iroha","misono_mika","kasumizawa_miyu","shirasu_azusa","tendou_alice","sunaookami_shiroko","sorasaki_hina","shiromi_iori","kuda_izuna","hayase_yuuka"],
	maintenance: false,
	coin: false,
	quoted: 'Harap sertakan teks dengan bahasa jepang!',
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
	let v = await vits(q, order.slice(1))
	let buff = new Buffer.from(v.base64, 'base64')
	    await client.sendMessage(from, { audio: buff, ptt: true, mimetype: 'audio/mpeg' }, { quoted: msg })
	}
}