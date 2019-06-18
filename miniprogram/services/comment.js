const { api } = require("./request.js")
const { dateFormat } = require("../lib/util.js")

function parseComment(data) {
  const { time, nickName, comment, avatarUrl } = data

  return {
    name: nickName,
    comment,
    avatarUrl,
    time: dateFormat(time, "yyyy.mm.dd HH:MM:ss")
  }
}

// 新增评论
const add = data => api("comment.add", data).then(parseComment)

// 获取所有评论
const getAllList = () => api("comment.getAllList")

// 获取分页评论
const getList = data =>
  api("comment.getList", data).then(res => {
    return res.map(parseComment)
  })

module.exports = {
  add,
  getAllList,
  getList
}
