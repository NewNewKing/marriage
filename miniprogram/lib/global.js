const info = require('../services/info.js')
const Event = require('./event.js')
const getInfo = function(app) {
  info.get().then(res => {
    res.$ready = true
    res.$indexBanners = res.$indexImgs.slice(2)
    res.$flashImgs = [
      {
        url: res.$indexImgs[0].url,
        class: 'halfFadeInDown',
        time: 1
      },
      {
        url: res.$indexImgs[1].url,
        time: 3,
        class: 'puffIn'
      }
    ]
    Event.emit('infoChange', res)
  })
}

module.exports = {
  getInfo
}
