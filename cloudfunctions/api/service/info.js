const dao = require('../dao/info.js')

const getInfo = async () => {
  const {
    data: [info]
  } = await dao.getInfo()
  const obj = {}
  // 所有字段加上$前缀
  for (let key in info) {
    obj['$' + key] = info[key]
  }
  return obj
}

const setInfo = async (id, data) => {
  const info = await dao.update(id, data)
  return info
}
module.exports = {
  getInfo,
  setInfo
}
