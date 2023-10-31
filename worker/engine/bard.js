const axios = require('axios')
//create by yanz × @rifza.p.p
exports.bard = async(text) => {
	return new Promise(async(resolve,reject) => {
 let yanz = await axios("https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=boq_assistant-bard-web-server_20230813.20_p0&f.sid=3965728980391072142&hl=id&_reqid=1260031&rt=c", {
 "headers": {
 "cookie": "_ga=GA1.1.1488021965.1692178722; NID=511=N6e-0DrrqeVL1qdC7I1hDcgXh1UDd_nGzDZ7fPGPOHD_8CrfeLYntgA6XSxwEOMIXcrm50FgRvHc4lyjqCNOn6hiQA99llP5MtWDK4kE9XlHV0z4pTKcFO5kfoKk03L6s55kCBTahtDC_SUEVZylxQb9PdHJVTGXLiRaiFGiytjmeVjYgXmEfBtI9jkxPh0OAzng2G26-q6FQoL4z0AlQmji7g; SID=ZwizR9gtuf88GJN91mf9bjTDSgp8kSCOU4H3PxSVGw2VAEDqYtxOzAgcoAqFevfCra1JJA.; __Secure-1PSID=ZwizR9gtuf88GJN91mf9bjTDSgp8kSCOU4H3PxSVGw2VAEDqIJEDgRLHKOsr1EOQvJfhaQ.; __Secure-3PSID=ZwizR9gtuf88GJN91mf9bjTDSgp8kSCOU4H3PxSVGw2VAEDqhQMhSdQRYydNS_HVl9MRPg.; HSID=AmcLDqd_0eNnPjrWw; SSID=A_OJlKGmdHLojzfgS; APISID=IMZC6IMVq0IDqNXz/A7a6uJ7y2uW-1rORR; SAPISID=gmLMoVUBsrMa4C10/AFrovAZk-1hWKJ8b_; __Secure-1PAPISID=gmLMoVUBsrMa4C10/AFrovAZk-1hWKJ8b_; __Secure-3PAPISID=gmLMoVUBsrMa4C10/AFrovAZk-1hWKJ8b_; SIDCC=APoG2W-BIzjEu80W3W9xL6GgxdBwrI-ZF5k3TP49FNDdJy6QmvSnWbKQ79Bm0g_zvlAtRQvp_g; __Secure-1PSIDCC=APoG2W82wQ69gAHd7GUUxupktbLTm5yxTM-IyItIW4qPM7xgwvnk-xgDhuIhdhbXxAd0TKST; __Secure-3PSIDCC=APoG2W8jCJyHYbvRiBe8o671nvog98kFi6COAsEJNID2sRLfsIocrJaVgpX2mseCegyCdwPVLg; _ga_WC57KJ50ZZ=GS1.1.1692178722.1.1.1692178860.0.0.0"
 },
 data: `f.req=%5Bnull%2C%22%5B%5B%5C%22S${text}%3F%5C%22%2C0%2Cnull%2C%5B%5D%2Cnull%2Cnull%2C0%5D%2C%5B%5C%22id%5C%22%5D%2C%5B%5C%22%5C%22%2C%5C%22%5C%22%2C%5C%22%5C%22%2Cnull%2Cnull%2C%5B%5D%5D%2C%5C%22!paalpvvNAAYDlPn_I5RCIMQqNNo_-cM7ADkAIwj8RvRlGXzZnkXs7tCj_gh5DYMFn88JtWiatkHotwfnoQS4NWnP5i_RrUIvRqSlUokcZpSfjvkCAAAFhVIAAAIDaAEHCgA7XrKzF5mEYOMJ6J-FW4D25FRIZpv61Tvh9xZws0tnXT_T5AzLUhOE58kHKQTCWlogwXuFVAcCK68KwE-ZAqVXn6s3SfWb0oSwCXIMxrlYMEf3xwQ9S9EcgjD-zF-Jqc9PVIqy12BY7pk8nNQ86k5tKb0TfHX5LXjgWULIYBWMlxX7OKBSPkglzD6qqCj8WqN2XZx-_pE81zZKCthSMBX3TjzCYtVtQs-20SeFX8htOFdswokMNPQN4Jt4nNwA-ozz16Sb5Hy9D7BeYBT9TA_j47HVm8BBJ8qjOsuK2judf9lsJjDVNnc3h0avyZKTlJZzGAOsFXhsbNJ3EyBwPfcqafF72x3hO15mEhQFVSkFlJ_-RFnfbveyZk1rp4Zzk_R2rGrQHhYKCxO2dFe_6yrobqf5HuD78xrkkA1DV8SPzzt-A_6kxOt59djh2Mxvf9g8iDehrwx8QM7Ql_D_CFEThKR5GWY4ZN1R5e7EEFDWJ7yGkMRRLiEdiEzJypFMDsGSSqv3kuLKqVCo_pIAXhZyuh2jlaIaQPxJriyO0nGSGynHPbr_ytyT3FGpVfIJ3fbft8P5eQHVyAc1K_MKMRXSaQLoU78qlNTGIiYQhQTbgQwh8s3JMjYqbe0Hr-3_wg4nNRylBGllWE_sZHViOlQp0oN7b_XCqfaAFOIaXp-YfgfIcrZg7JpjT9L87p0Cc6TYUGPqwX8B29i1Hljb_QlWWIKh_13XjNTAyymoEZWOWMOzSnOA6mu2HPE4613vG7KLaAY13vLwN6-qUUaTk-7MZSzTrDCiN6tvDnnszJnTZYXrc0Fl-TWIwxXo3g_o9W04C4O5N-C0v5Q9LwnIhjaeJdcoPjyc_WOkEfZ8-GzwR7L_tArtOkKFqBihbTeTyA7miYV8tpZgDdDNRwfTfJjKJmhXV52ThCORCSnGdVNpyA7HDkJ2EMyLohDmAC33KKsGh4w0cHfGQYdTm5KtYwEl58NhkQ%5C%22%2C%5C%22c2f33cdd67406c28d4ff6a4870fb5f90%5C%22%2Cnull%2C%5B1%5D%2C0%2C%5B%5D%2C%5B%5D%2C1%5D%22%5D&at=AOTFbH6aM6ipkembCTT7oOx3n4nZ%3A1692178827613&`,
 "method": "POST"
 })
 console.log(yanz)
 let data = yanz.data.replace(/\\/g, '\\'.slice(1)).split('",[\"')[1].split('"]')[0]

 resolve({ msg: data.slice(0, -1) })
 
 })
}
//exports.bard("lu ini apa cok").then(a => console.log(a))