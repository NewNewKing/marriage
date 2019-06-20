const info = require('../static/marriage.info.js')
const flashTexts = require('../static/flash.text.js')

const cloud = require('wx-server-sdk')
// 云文件 ID 换取真实链接
async function replaceUrl(list) {
  const { fileList } = await cloud.getTempFileURL({
    fileList: list
  })
  return fileList.map(({ tempFileURL }) => tempFileURL)
}

// 获取设置信息 并且把所有云ID转化为真实链接
const get = async () => {
  const { $photos, $indexUseImgNumber } = info
  const options = Object.assign({}, info)
  const data = await replaceUrl($photos)

  options.$photos = data
  options.$indexFlashTexts = flashTexts
  options.$indexImgs = data.slice(0, $indexUseImgNumber)
  delete options.$indexUseImgNumber
  return { data: options }
}
module.exports = {
  get
}
