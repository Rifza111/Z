 const axios = require('axios')
const fs = require('fs')

let headers = {
 "content-type": "application/json",
 "token": "eyJhbGciOiJIUzI1NiIsImtpZCI6IjFlYWZPREQ3d3dodHFGVXgiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjkyNjUxNjQ3LCJpYXQiOjE2OTIwNDY4NDcsImlzcyI6Imh0dHBzOi8vaGxobW1rcHVncnVrbmVmc3R0bHIuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjQyZTExYzY0LWM0NmUtNDUzOS1iNzQ2LTIzN2JkNjNmNWNlOSIsImVtYWlsIjoiZmZ5YW56NDg0QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0Y2hFVU5Rcy1iY0w3bVVCZUd6X25RZm1Ka0E1OU5oUlczbzBDcHRjWTJGPXM5Ni1jIiwiZW1haWwiOiJmZnlhbno0ODRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkZGIFlhbnoiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoiRkYgWWFueiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRjaEVVTlFzLWJjTDdtVUJlR3pfblFmbUprQTU5TmhSVzNvMENwdGNZMkY9czk2LWMiLCJwcm92aWRlcl9pZCI6IjEwMTU3MTIyMjMzNDMyMjU5ODIxMCIsInN1YiI6IjEwMTU3MTIyMjMzNDMyMjU5ODIxMCJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNjkyMDQ2ODQ3fV0sInNlc3Npb25faWQiOiI4NzMwYzlhMi0zOTYzLTQ2YWQtODdiNS1lMDYwOTZiY2ViY2UifQ.zg4KcKauV4DPvfjGI7a8ZhlCZ9nr6-J3NFlPgKjdAFc",
 "Referer": "https://app.supermeme.ai/text-to-meme",
 "Referrer-Policy": "strict-origin-when-cross-origin"
 }
 
 /*
[ SCRAPER ]
Scraper by YanzBotz

Thank To
• Bang rifza ( Guru )
• YanzBotz
• All Creator Bot
*/
		

exports.TextoMeme = async(prompt) => {
	return new Promise(async(resolve,reject) => {

 axios("https://app.supermeme.ai/api/auth/meme/text-to-meme", {
 headers: headers,
 data: {
 text: prompt,
 imageCount: 3,
 maxDimension: 500,
 inputLanguage: "id",
 outputLanguage: "id"
},
 "method": "POST"
}).then(yanz => {
let res = yanz.data.results
var yan = res[Math.floor(Math.random() * (res.length))]
 resolve(yan) 
})
})
}

exports.searchMeme = async(query) => {
	return new Promise(async(resolve,reject) => {
		
 axios.get("https://app.supermeme.ai/api/search?searchQuery=" + query, {
 headers: headers,
}).then(yanz => {
 let res = yanz.data.memeTemplates
var yan = res[Math.floor(Math.random() * (res.length))]
 resolve(yan) 
})
})
}

exports.smeme = async(image, text1, text2) => {
	return new Promise(async(resolve,reject) => {
	
axios("https://app.supermeme.ai/api/result", {
 headers: headers,
 data: {
 "imageName": "data:image/jpeg;base64," + image.toString('base64'),
 "captions": [
 {
 "fontSize": 25,
 "text": text1,
 "x": 0,
 "y": 2,
 "fontFamily": null,
 "width": 500,
 "height": 41
 },
 {
 "fontSize": 25,
 "text": text2,
 "x": 0,
 "y": 368.1,
 "fontFamily": null,
 "width": 500,
 "height": 41
 }
 ],
 "header": {
 "text": "",
 "fontSize": 20,
 "fontColor": "#000000",
 "fontFamily": "Inter,system-ui,sans-serif,Arial,Helvetica"
 },
 "footer": {
 "text": "",
 "fontSize": 20,
 "fontColor": "#000000",
 "fontFamily": "Inter,system-ui,sans-serif,Arial,Helvetica"
 },
 "width": 500,
 "height": 410
},
"method": "POST"
}).then(res => {
let yanz = res.data.result.image_name.replace('data:image/jpeg;base64,', '')
 resolve(yanz) 
})
})
}