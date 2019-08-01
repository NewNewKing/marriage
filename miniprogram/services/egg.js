const { api } = require('./request.js')

const clue = data => api('egg/clue', data)

module.exports = {
  clue
}
