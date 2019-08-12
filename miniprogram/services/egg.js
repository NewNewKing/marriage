const { api } = require('./request.js')

const clue = data => api('egg/clue', data)

const getList = data => api('egg/getList', data)

module.exports = {
  clue,
  getList
}
