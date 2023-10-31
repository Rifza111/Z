const axios = require("axios")

exports.IMGEnhance = async(url, scale) => {
  const scaleNumber = scale ? scale : 4;
  const { data } = await axios(`https://toolsapi.spyne.ai/api/forward`, {
    method: "post",
    data: {
      image_url: url,
      scale: scaleNumber,
      save_params: {
        extension: ".png",
        quality: 95,
      },
    },
    headers: {
      "content-type": "application/json",
      accept: "*/*",
    },
  });
  return data;
}
