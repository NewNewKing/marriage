const { api } = require("./request.js")

const add = data => {
  return api("comment.add", data)
}

const getAllList = () => {
  return api("comment.getAllList")
}

const getList = data => {
  return api("comment.getList", data)
}

module.exports = {
  add,
  getAllList,
  getList
}
