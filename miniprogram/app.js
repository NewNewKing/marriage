const info = require("./services/info.js")
const Event = require("./lib/event.js")
//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力")
    } else {
      wx.cloud.init({
        env: "test-nnhi8",
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
        Event.emit("infoChange", res)
      })
      .catch(err => {
        wx.showToast({
          title: err,
          duration: 3000
        })
      })
  }
})
