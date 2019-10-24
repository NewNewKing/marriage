const cloud = require('wx-server-sdk')
const db = cloud.database()
const MANAGER = db.collection('manager')

const add = async data => {
  return await MANAGER.add({
    data
  })
}

const find = async OPENID => {
  return await MANAGER.where({
    OPENID
  }).get()
}

const getCount = async () => {
  return await MANAGER.count().then(res => res.total)
}

module.exports = {
  add,
  getCount,
  find
}
