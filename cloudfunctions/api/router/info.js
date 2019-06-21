const info = require('../static/marriage.info.js')
const flashTexts = require('../static/flash.text.js')
// 获取设置信息
const get = async () => {
  const { $photos, $indexUseImgNumber } = info
  const options = Object.assign({}, info)
  options.$indexFlashTexts = flashTexts
  options.$indexImgs = $photos.slice(0, $indexUseImgNumber)
  delete options.$indexUseImgNumber
  return { data: options }
}
module.exports = {
  get
}
