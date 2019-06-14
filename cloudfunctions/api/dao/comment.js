const cloud = require("wx-server-sdk")
cloud.init()

const COMMENT = cloud.database().collection("comment")

const add = async data => {
  return COMMENT.add({
    data
  })
}

const getList = async data => {
  const { pageSize, pageNum } = data
  return COMMENT.skip(pageSize * pageNum - pageSize)
    .limit(pageSize)
    .orderBy("time", "desc")
    .get()
}

const getCount = async () => {
  return COMMENT.count()
}

module.exports = {
  add,
  getList,
  getCount
}
