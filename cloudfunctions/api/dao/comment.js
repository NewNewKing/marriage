const cloud = require('wx-server-sdk')
const db = cloud.database()
const COMMENT = db.collection('comment')
const add = async data => {
  return await COMMENT.add({
    data
  })
}

const getList = async data => {
  const { pageSize, pageNum } = data
  return await COMMENT.skip(pageSize * pageNum - pageSize)
    .limit(pageSize)
    .orderBy('time', 'desc')
    .get()
}

const getCount = async () => {
  return await COMMENT.count()
}

module.exports = {
  add,
  getList,
  getCount
}
