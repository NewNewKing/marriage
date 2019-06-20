const info = require('./services/info.js')
const Event = require('./lib/event.js')
const { unique } = require('./lib/util.js')
const ImgLoader = require('./lib/imgLoader.js')
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
    info
      .get()
      .then(res => {
        this.globalData = {
          info: res
        }
        const { $style, $indexImgs } = res
        // Event.emit('infoChange', { $style })
        res.$markers = getMarker(res)
        res.$ready = true
        res.$indexBanners = $indexImgs
        Event.emit('infoChange', res)
        return
        // 预加载图片
        // ImgLoader.limitMany({
        //   imgList: $indexBanners,
        //   limit: 5
        // }).then(() => {
        //   res.$markers = getMarker(res)
        //   res.$ready = true
        //   Event.emit('infoChange', res)
        // })
      })
      .catch(err => {
        console.log(err)
        wx.showToast({
          title: err,
          duration: 3000
        })
      })
  }
})
