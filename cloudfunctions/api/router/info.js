const info = require('../static/marriage.info.js')
const service = require('../service/info.js')
const flashTexts = require('../static/flash.text.js')
// 获取设置信息
const get = async () => {
  const info = await service.getInfo()
  const { $photos, $indexUseImgNumber } = info
  const options = Object.assign({}, info)
  options.$indexFlashTexts = flashTexts
  options.$indexImgs = $photos.slice(0, $indexUseImgNumber)
  delete options.$indexUseImgNumber
  return { data: options }
}

const setInfo = async data => {
  await service.setInfo(data.id, data.data)
  return { code: 2, msg: '信息修改成功！' }
}
module.exports = {
  get,
  setInfo
}
