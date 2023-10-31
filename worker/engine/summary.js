const axios = require("axios")

exports.summary = async(text) => {
  return new Promise(async(resolve, reject) => {
  let payload = new URLSearchParams(
    Object.entries({
      data: text,
      percnt: 60,
      sorder: "no"
    })
  )
  let headers = {
    "content-type": "application/x-www-form-urlencoded"
  }
    let post = await axios({
      url: "https://www.summarizingtool.net/frontend/summarizerBeta",
      method: "POST",
      data: payload,
      headers: headers
    })

    resolve(post.data)
  })
}
