const axios = require('axios')
const cheerio = require('cheerio')

exports.mega = async(text) => {
	return new Promise(async(resolve,reject) => {

let yanz = await axios("https://play.ht/api/studio/process-audio", {
 headers: {
 "baggage": "sentry-environment=production,sentry-public_key=fd6295c5ec57460e945d4d0614d7d4bb,sentry-trace_id=bdf6be9661854e58b1d0541cd69c6a59",
 "content-type": "application/json",
 "sentry-trace": "bdf6be9661854e58b1d0541cd69c6a59-8feb26a52b42bb45-0",
 "cookie": "_gcl_au=1.1.1725229095.1692197069; _gid=GA1.2.634055609.1692197071; ln_or=eyI3NTcyNTkiOiJkIn0%3D; crisp-client%2Fsession%2Fbe1ec052-4af0-4fbb-b9dd-66551f587ef0=session_e4e6a64d-87b3-4e0f-be6f-f5ef970a7c71; _clck=1xp4q0z|2|fe7|0|1323; __stripe_mid=b200d529-48c5-4c5c-bccf-6950c433e3b5d841b5; __stripe_sid=4773d391-d886-4e90-bee0-c88a37ae3f026fa414; _ga=GA1.1.1515337220.1692197071; _ga_T2B9ZX6TWG=GS1.1.1692197070.1.1.1692198260.33.0.0; mp_0f47df73c7f008221ed328107e7cd847_mixpanel=%7B%22distinct_id%22%3A%20%22189fece154717-00ffb5311fed05-b457656-6ddd0-189fece15493f%22%2C%22%24device_id%22%3A%20%22189fece154717-00ffb5311fed05-b457656-6ddd0-189fece15493f%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fplay.ht%2F%22%2C%22%24initial_referring_domain%22%3A%20%22play.ht%22%7D; _ga_6S5N2RJHSR=GS1.1.1692197109.1.1.1692198690.0.0.0",
 "Referer": "https://play.ht/studio/files/b0ffe765-cbfe-4aef-818f-b412f4719aae?voice=s3%3A%2F%2Fvoice-cloning-zero-shot%2F8c4959e4-94c9-4ff3-a21e-9b7cbeebba5d%2Fmega-chan%2Fmanifest.json",
 "Referrer-Policy": "strict-origin-when-cross-origin"
 },
 data: {
 "userId": "SwjNEyRPqxeI4EgNsuRDJOiWAts1",
 "size": 1,
 "voice": "s3://voice-cloning-zero-shot/8c4959e4-94c9-4ff3-a21e-9b7cbeebba5d/mega-chan/manifest.json",
 "preset": "balanced",
 "speed": "1.0",
 "content": text,
 "hash": "f59176ef-e258-4009-8ad6-fb4eb319c8a9",
 "projectId": "b0ffe765-cbfe-4aef-818f-b412f4719aae",
 "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiWWFuenp6IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3BsYXktNjg3MDUiLCJhdWQiOiJwbGF5LTY4NzA1IiwiYXV0aF90aW1lIjoxNjkyMTk4MjU5LCJ1c2VyX2lkIjoiU3dqTkV5UlBxeGVJNEVnTnN1UkRKT2lXQXRzMSIsInN1YiI6IlN3ak5FeVJQcXhlSTRFZ05zdVJESk9pV0F0czEiLCJpYXQiOjE2OTIyMDIxNTIsImV4cCI6MTY5MjIwNTc1MiwiZW1haWwiOiJmZnlhbno0ODRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImZmeWFuejQ4NEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.fK2vHY3Q0NcUMnymukHr2erCQ7N7Vqdd-bmqOjKn3YHfi0PuWzlXLhkrSj8FiNpkU30YmcYhSgGUPL2KuSUPOURVB16xcOhyS2pOYt9gt-tjNkgQcmel0PxIMyvAV-tmgIHh_rwj62W_LDmBrVerAE3O2XQrYLB9grr_jHIC8xPJ8GCUVlS5TzB0R99zhA--SkpEJva7hT8Qcx5UQbNPTOXbXwBccAjX--PHqWwq8bv-oV5T4mKP8bgDO0DvWQ6A4GTRrJyNzEIY0wDMCl-2Rccwi4p4jA1RksNNeUcLAWVBq5uvSpMqcxohpnmFkJKutooFRd9jhGPH-8CqUyg6lw",
 "textContentHash": "13740c766a5dae7d1704ed30d498a6293eb60bb4"
},
"method": "POST"
})
 resolve(yanz.data.data.result) 
})
}