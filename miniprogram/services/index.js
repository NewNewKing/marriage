const { comment } = require("./request.js")

const add = data => {
  return comment("add", data)
}

const getAllList = () => {
  return comment("getAllList")
}

module.exports = {
  add,
  getAllList
}
