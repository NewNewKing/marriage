const info = require('../services/info.js')
const Event = require('./event.js')
const setTabBar = require('./setTabBar.js')
const getInfo = function(app) {
  info.get().then(res => {
    res.$ready = true
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
    // res.$style = 'pink'
    Event.emit('infoChange', res)
  })
}

module.exports = {
  getInfo
}
