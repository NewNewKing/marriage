const { api } = require('./request.js')

const add = data => api('attend/add', data)

const get = () => api('attend/get')

const getAll = () => api('attend/getAll')

const update = params => api('attend/update', params)

module.exports = {
  add,
  get,
  getAll,
  update
}
