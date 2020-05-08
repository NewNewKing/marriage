const { api } = require('./request.js')
const { dateFormat } = require('../lib/util.js')

function parseComment(data) {
  const { time } = data
  data.time = dateFormat(time, 'mm.dd HH:MM')
  return data
}

const clue = data => api('egg/clue', data)

const getList = data => api('egg/getList', data).then(res => {
  return res.map(parseComment)
})

module.exports = {
  clue,
  getList
}
