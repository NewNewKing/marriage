const info = require('../services/info.js')
const Event = require('./event.js')
// 获取地图坐标点
function getMarker({ $lat, $lon }) {
  return [
    {
      id: 1,
      latitude: +$lat,
      longitude: +$lon,
      iconPath: '/images/nav.png',
      width: 50,
      height: 50
    }
  ]
}
const getInfo = function(app) {
  info.get().then(res => {
    res.$ready = true
    res.$markers = getMarker(res)
    res.$indexBanners = res.$indexImgs.slice(2)
    Event.emit('infoChange', res)
  })
}

module.exports = {
  getInfo,
  getMarker
}
