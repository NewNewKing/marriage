const Event = require('./lib/event.js')
const { getInfo } = require('./lib/global.js')

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
    Event.on('infoChange', info => {
      if (this.globalData && this.globalData.info) {
        Object.assign(this.globalData.info, info)
      } else if (this.globalData) {
        this.globalData.info = info
      } else {
        this.globalData = {
          info
        }
      }
    })
    // 获取全局配置信息
    getInfo(this)
  }
})
