const service = require('../service/egg.js')
const cloud = require('wx-server-sdk')

const clue = async data => {
  const { OPENID } = cloud.getWXContext()
  if (!OPENID) {
    return { code: 1, msg: '缺少用户身份标志' }
  }
  const result = await service.clue(data, OPENID)
  return { code: 0, data: result }
}

const getList = async data => {
  const { pageSize = 20, pageNum } = data
  const result = await service.getList({ pageSize, pageNum })
  return result
}

module.exports = {
  clue,
  getList
}
