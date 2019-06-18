const info = require("../static/marriage.info.js")
const cloud = require("wx-server-sdk")
// 云文件 ID 换取真实链接
async function replaceUrl(list) {
  const urls = [...new Set(list.filter(url => /^cloud:\/\//.test(url)))]
  if (!urls.length) return list
  const { fileList } = await cloud.getTempFileURL({
    fileList: urls
  })
  fileList.map(({ fileID, tempFileURL }) => {
    const index = list.findIndex(item => item === fileID)
    list[index] = tempFileURL
  })
  return list
}

// 获取设置信息 并且把所有云ID转化为真实链接
const get = async () => {
  const { $indexBanners, $photos } = info
  const data = await Promise.all([
    replaceUrl($indexBanners),
    replaceUrl($photos)
  ])
  info.$indexBanners = data[0]
  info.$photos = data[1]

  return { data: info }
}
module.exports = {
  get
}
