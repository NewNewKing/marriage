const service = require('../service/attend.js')

const add = async data => {
  const result = await service.add(data)

  return { code: 2, data: result, msg: '提交成功' }
}

const get = async () => {
  const result = await service.get()
  return { code: 0, data: result }
}

const getAll = async () => {
  const result = await service.getAll()
  return { code: 0, data: result }
}

const update = async params => {
  const result = await service.update(params.id, params.data)
  return { code: 2, msg: '修改信息成功' }
}
module.exports = {
  add,
  get,
  getAll,
  update
}
