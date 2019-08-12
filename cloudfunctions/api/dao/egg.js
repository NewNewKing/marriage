const cloud = require('wx-server-sdk')
const db = cloud.database()
const EGG = db.collection('egg')

const add = async data => {
  return await EGG.add({ data })
}

const doc = async id => {
  return await EGG.doc(id).get()
}

const getCount = async () => {
  return await EGG.count()
}

const getList = async data => {
  const { pageSize, pageNum } = data
  return await EGG.skip(pageSize * pageNum - pageSize)
    .limit(pageSize)
    .orderBy('rank', 'asc')
    .get()
}
module.exports = {
  add,
  getCount,
  doc,
  getList
}
