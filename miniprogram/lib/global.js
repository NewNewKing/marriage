const info = require('../services/info.js')
const Event = require('./event.js')
const getInfo = function(app) {
  info.get().then(res => {
    res.$ready = true
    res.$indexBanners = res.$photos.slice(2, 3)
    res.$flashImgs = [
      {
        url: res.$photos[0] && res.$photos[0].url,
        class: 'halfFadeInDown',
        time: 1
      },
      {
        url: res.$photos[1] && res.$photos[1].url,
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
