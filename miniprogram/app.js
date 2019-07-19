const info = require('./services/info.js')
const Event = require('./lib/event.js')
// 获取地图坐标点
function getMarker({ $lat, $lon }) {
  return [
    {
      id: 1,
      latitude: $lat,
      longitude: $lon,
      iconPath: '/images/nav.png',
      width: 50,
      height: 50
    }
  ]
}
//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'test-nnhi8',
        traceUser: true
      })
    }
    // 获取全局配置信息
    info.get().then(res => {
      this.globalData = {
        info: res
      }
      res.$ready = true
      res.$markers = getMarker(res)
      res.$indexBanners = res.$indexImgs.slice(2)
      Event.emit('infoChange', res)
    })
  }
})
