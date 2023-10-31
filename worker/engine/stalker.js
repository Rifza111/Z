const axios = require("axios")
const cheerio = require('cheerio')

class stalker {
 constructor() {
 (this.instagramURL = "https://www.inststalk.com"),
 (this.tiktokURL = "https://www.tiktokstalk.com"),
 (this.githubURL = "https://api.github.com"),
 (this.twetterURL = "https://instalker.org"),
 (this.npmURL = "https://npmjs.com"),
 (this.freeFireURL = "https://order.codashop.com"),
 (this.mobileLegendsURL = "https://api.duniagames.co.id");
 }
 instagram = async (username) => {
 return new Promise(async (resolve, reject) => {
 try {
 const { data } = await axios.get(this.instagramURL + "/search?user=" + username);
 const $ = cheerio.load(data);
 const search = $("div.row > div.col-sm-6.col-md-4.col-lg-3")
 .map((_, el) => {
 return {
 username: $(el).find("a").attr("title"),
 img: $(el).find("a > div.user-image > div.background.lazy").attr("data-src"),
 url: "https://www.inststalk.com" + $(el).find("a").attr("href"),
 };
 }).get();
 if (search.length == 0) throw "User Not Found!";
 const response = await axios.get(search[0].url);
 const $$ = cheerio.load(response.data);
 const result = {
 status: 200,
 profile: $$("div.user-info > figure > img").attr("src"),
 username: $$("div.user-info > div.article div.top div.title > h1").text().trim(),
 name: $$("div.user-info > div.article div.top div.title > h2").text().trim(),
 description: $$("div.user-info > div.article > div.description > p").text().trim(),
 posts: $$("div.col-lg-5.separate-column > div.row > div.col > div.number-box > .count",).eq(0).text().trim(),
 followers: $$("div.col-lg-5.separate-column > div.row > div.col > div.number-box > .count",).eq(1).text().trim(),
 following: $$("div.col-lg-5.separate-column > div.row > div.col > div.number-box > .count",).eq(2).text().trim(),
 };
 resolve(result);
 } catch (e) {
 console.log(e);
 reject({
 status: 300,
 message: "request failed",
 });
 }
 });
 }
 tiktok = async (username) => {
 return new Promise(async (resolve, reject) => {
 await axios
 .request({
 baseURL: this.tiktokURL,
 url: "/user/" + username,
 method: "GET"
 })
 .then(( response ) => {
 const $ = cheerio.load(response.data)
 const result = {
 status: 200,
 profile: $("div.row > div.col-lg-7.separate-column > div.user-info > figure > img").attr("src"),
 username: $("div.row > div.col-lg-7.separate-column > div.user-info > div.article > div.top > div.title > h1").text().trim(),
 name: $("div.row > div.col-lg-7.separate-column > div.user-info > div.article > div.top > div.title > h2").text().trim(),
 desc: $("div.row > div.col-lg-7.separate-column > div.user-info > div.article > div.description > p").text().trim(),
 likes: $("div.col-lg-5.separate-column > div.row > div.col > div.number-box > .count").eq(0).text().trim(),
 followers: $("div.col-lg-5.separate-column > div.row > div.col > div.number-box > .count").eq(1).text().trim(),
 following: $("div.col-lg-5.separate-column > div.row > div.col > div.number-box > .count").eq(2).text().trim(),
 }
 resolve(result)
 })
 .catch((e) => {
 console.log(e)
 reject({
 status: 300,
 message: "request failed",
 });
 })
 })
 }
 github = async (username) => {
 return new Promise(async (resolve, reject) => {
 await axios
 .request({
 baseURL: this.githubURL,
 url: "/users/" + username,
 method: "GET"
 })
 .then(( response ) => {
 resolve(response.data)
 })
 .catch((e) => {
 console.log(e)
 reject({
 status: 300,
 message: "request failed",
 });
 })
 })
 }
 twetter = async (username) => {
 return new Promise(async (resolve, reject) => {
 await axios
 .request({ 
 baseURL: this.twetterURL,
 url: "/" + username,
 method: "GET"
 }
 )
 .then(({ data }) => {
 let $ = cheerio.load(data)
 let tweets = []
 $('div.activity-posts').each(function (a, b) {
 tweets.push({
 author: {
 username: $(b).find('div.user-text3 > h4 > span').text(),
 nickname: $(b).find('div.user-text3 > h4').text().split('@')[0] || $(b).find('div.user-text3 > h4').text().trim(),
 profile_pic: $(b).find('img').attr('src') || $(b).find('img').attr('onerror'),
 upload_at: $(b).find('div.user-text3 > span').text()
 },
 title: $(b).find('div.activity-descp > p').text() || '',
 media: $(b).find('div.activity-descp > div > a').attr('href') || $(b).find('div.activity-descp > p > video').attr('src') || $(b).find('div.activity-descp > div > a > img').attr('src') || $(b).find('div.activity-descp > div > a > video').attr('src') || 'No Media Upload',
 retweet: $(b).find('div.like-comment-view > div > a:nth-child(1) > span').text().replace('Download Image', ''),
 likes: $(b).find('div.like-comment-view > div > a:nth-child(2) > span').text()
 })
 })
 let hasil = {
 username: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3 > span').text(),
 nickname: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3').text().split('@')[0] || $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3').text(),
 background: $('body > main > div.dash-todo-thumbnail-area1 > div.todo-thumb1.dash-bg-image1.dash-bg-overlay').attr('style').split('url(')[1].split(')')[0],
 profile: $('body > main > div.dash-todo-thumbnail-area1 > div.dash-todo-header1 > div > div > div > div > div > a > img').attr('src') || $('body > main > div.dash-todo-thumbnail-area1 > div.dash-todo-header1 > div > div > div > div > div > a').attr('href'),
 desc_text: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(2)').text() || '',
 join_at: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(3)').text() || $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(5)').text(),
 map: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(4)').text() || '',
 tweets_count: $('body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(1) > div > div.dscun-numbr').text(),
 followers: $('body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(2) > div > div.dscun-numbr').text(),
 following: $('body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(3) > div > div.dscun-numbr').text(),
 media_count: tweets.length,
 media: tweets || 'No Media Upload'
 }
 resolve(hasil)
 })
 })
 }
 npm = async (pkg) => {
 return new Promise(async (resolve, reject) => {
 await axios
 .request({
 baseURL: this.npmURL,
 url: "/package/" + pkg,
 method: "GET"
 }
 )
 .then(({ data }) => {
 let $ = cheerio.load(data)
 let keywords = []
 let info = []
 let collaborator = []
 $('#tabpanel-readme > div.pv4 > ul > li').each(function (a, b) {
 keywords.push($(b).text())
 })
 $('div._702d723c.dib.w-50.bb.b--black-10.pr2').each(function (a, b) {
 info.push({ type: $(b).find('h3').text(), result: $(b).find('p').text() || $(b).find('a').text() })
 })
 $('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > div.w-100 > ul > li').each(function (a, b) {
 collaborator.push({ name: $(b).find('a').attr('href').replace('/~', ''), url: 'https://www.npmjs.com'+$(b).find('a').attr('href') })
 })
 let hasil = {
 status: 200,
 title: $('#top > div.w-100.ph0-l.ph3.ph4-m > h2 > span').text(),
 language: $('#top > div.w-100.ph0-l.ph3.ph4-m > h2 > div').text() || 'Default',
 publish: $('#top > div.w-100.ph0-l.ph3.ph4-m > span:nth-child(4)').text(),
 readme: $('#readme').text() || '',
 explore: $('#package-tab-explore > span').text().replace(' Explore ', '') || '',
 dependencies: $('#package-tab-dependencies > span').text().replace(' Dependencies', '') || '',
 dependents: $('#package-tab-dependents > span').text().replace(' Dependents', '') || '',
 version_count: $('#package-tab-versions > span').text().replace(' Versions', '') || '',
 keywords: keywords || [],
 install: $('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > p > code > span').text(),
 info,
 collaborator
 }
 resolve(hasil)
 })
 .catch((e) => {
 console.log(e)
 reject({
 status: 300,
 message: "request failed",
 });
 })
 })
 }
 freeFire = async (id) => {
 return new Promise(async (resolve, reject) => {
 const payload = {
 "voucherPricePoint.id": 8050,
 "voucherPricePoint.price": "",
 "voucherPricePoint.variablePrice": "",
 "email": "",
 "n": "",
 "userVariablePrice": "",
 "order.data.profile": "",
 "user.userId": id,
 "voucherTypeName": "FREEFIRE",
 "affiliateTrackingId": "",
 "impactClickId": "",
 "checkoutId": "",
 "tmwAccessToken": "",
 "shopLang": "in_ID",
 }
 await axios
 .request({
 method: "POST",
 baseURL: this.freeFireURL,
 url: "/id/initPayment.action",
 data: payload,
 headers: {
 "Content-Type": "application/json; charset\u003dutf-8"
 },
 }
 )
 .then(( response ) => {
 resolve({
 status: 200,
 id: id,
 nickname: response.data["confirmationFields"]["roles"][0]["role"]
 })
 })
 .catch((e) => {
 console.log(e)
 reject({
 status: 300,
 message: "request failed",
 });
 }) 
 })
 }
 mobileLegends = async (id, zoneId) => {
 return new Promise(async (resolve, reject) => {
 const payload = new URLSearchParams(
 Object.entries({
 productId: '1',
 itemId: '2',
 catalogId: '57',
 paymentId: '352',
 gameId: id,
 zoneId: zoneId,
 product_ref: 'REG',
 product_ref_denom: 'AE',
 })
 )
 await axios
 .request({
 method: "POST",
 baseURL: this.mobileLegendsURL,
 url: "/api/transaction/v1/top-up/inquiry/store",
 data: payload,
 headers: {
 'Content-Type': 'application/x-www-form-urlencoded',
 Referer: 'https://www.duniagames.co.id/',
 Accept: 'application/json',
 }
 }
 )
 .then(( response ) => {
 resolve(response.data.data.gameDetail)
 })
 .catch((e) => {
 console.log(e)
 reject({
 status: 300,
 message: "request failed",
 });
 }) 
 })
 }
}

module.exports = stalker