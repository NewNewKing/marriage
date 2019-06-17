const { api } = require("./request.js")

// 新增评论
const add = data => api("comment.add", data)

// 获取所有评论
const getAllList = () => api("comment.getAllList")

// 获取分页评论
const getList = data => api("comment.getList", data)

module.exports = {
  add,
  getAllList,
  getList
}
