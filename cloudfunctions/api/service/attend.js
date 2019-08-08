const dao = require('../dao/attend.js')
const cloud = require('wx-server-sdk')

const add = async data => {
  const { OPENID } = cloud.getWXContext()
  data.time = Date.now()
  data._id = OPENID
  return dao.add(data)
}

const get = async () => {
  const { OPENID } = cloud.getWXContext()
  const result = await dao.doc(OPENID).catch(() => {
    return { data: null }
  })
  return result.data
}

// 获取所有内容
const getAll = async () => {
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

  return Promise.all(list.reverse()).then(res =>
    res.reduce((list, item) => {
      return [...list, ...item.data]
    }, [])
  )
}

const update = async (id, data) => {
  const result = await dao.update(id, data)
  return result
}

module.exports = {
  add,
  get,
  getAll,
  update
}
