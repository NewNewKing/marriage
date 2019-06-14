const dao = require("../dao/comment.js")
const add = async data => {
  return dao.add(data)
}
const getList = async data => {
  return dao.getList(data)
}

const getAllList = async data => {
  const pageSize = 20
  const count = await dao.getCount().then(res => res.total)
  let time = count / pageSize

  if (time !== (time | 0)) {
    time = (time | 0) + 1
  }
  const list = []
  while (time > 0) {
    const task = dao.getList({
      pageNum: time,
      pageSize
    })
    list.push(task)
    --time
  }
  // return Promise.all(list.reverse()).then(res => res)
  return Promise.all(list.reverse()).then(res =>
    res.reduce((list, item) => {
      return [...list, ...item.data]
    }, [])
  )
}

module.exports = {
  add,
  getList,
  getAllList
}
