const dao = require('../dao/manager.js')
const cloud = require('wx-server-sdk')

const add = async () => {
  const { OPENID } = cloud.getWXContext()
  return await dao.add({
    OPENID
  })
}

const find = async () => {
  const { OPENID } = cloud.getWXContext()
  return await dao.find(OPENID).then(res => res.data)
}

const getCount = async () => {
  return await dao.getCount().catch(() => 0)
}

module.exports = {
  add,
  find,
  getCount
}
