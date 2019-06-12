const service = require("./service.js")

// data: { name: 'XXX', comment: 'xxxx'}
const add = async data => {
  return service.add(data)
}

const getList = async data => {
  const { pageSize = 20, pageNum = 1 } = data

  return service.getList({
    pageSize,
    pageNum
  })
}
const getAllList = async () => {
  return service.getAllList()
}

module.exports = {
  add,
  getList,
  getAllList
}
