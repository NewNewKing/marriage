const cloud = require('wx-server-sdk')
const db = cloud.database()
const ATTEND = db.collection('attend')

const add = async data => {
  return await ATTEND.add({ data })
}
const doc = async id => {
  return await ATTEND.doc(id).get()
}

const getList = async data => {
  const { pageSize, pageNum } = data
  return await ATTEND.skip(pageSize * pageNum - pageSize)
    .limit(pageSize)
    .orderBy('time', 'desc')
    .get()
}

const getCount = async () => {
  return await ATTEND.count()
}

const update = async (id, data) => {
  return await ATTEND.doc(id).update({
    data: {
      attendInfo: data
    }
  })
}

module.exports = {
  add,
  doc,
  getList,
  update,
  getCount
}
