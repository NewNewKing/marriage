const info = require('../services/info.js')
const Event = require('./event.js')
const getInfo = function(app) {
  info.get().then(res => {
    res.$ready = true
    res.$indexBanners = res.$indexImgs.slice(2)
    Event.emit('infoChange', res)
  })
}

module.exports = {
  getInfo
}
