const dao = require('../dao/comment.js')
const add = async data => {
  data.isDel = false
  return dao.add(data)
}
// 获取列表
const getList = async data => {
  return dao.getList(data).then(res => res.data)
}

// 获取所有内容
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
      pageSize,
      isDel: false
    })
    list.push(task)
    --time
  }

  return Promise.all(list.reverse()).then(res =>
    res.reduce((list, item) => {
      return [...list, ...item.data]
    }, [])
  )
}

const updateList = async (ids, data) => {
  const list = ids.map(item => dao.update(item, data))
  const result = await list
  return result
}

module.exports = {
  add,
  getList,
  getAllList,
  updateList
}
