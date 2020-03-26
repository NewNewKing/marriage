const info = require('../services/info.js')
const Event = require('./event.js')
const setTabBar = require('./setTabBar.js')
const getInfo = function(app) {
  info.get().then(res => {
    res.$ready = true
    Event.emit('infoChange', res)
  })
}

module.exports = {
  getInfo
}
