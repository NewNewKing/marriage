const { indexBanners } = require('../../marriage.info.js')
const app = getApp()

Page({
  data: {
    style: app.globalData.style,
    current: 0,
    isMoving: false,
    y: 0
  },
  start({ changedTouches }){
    const { clientY } = changedTouches[0]
    this.setData({
      isMoving: true,
      y: clientY
    })
  },
  move({ changedTouches }){
    const { clientY } = changedTouches[0]
    const { y , isMoving, current } = this.data
    const len = indexBanners.length

    if (!isMoving) {
      return 
    }
    if (y - clientY >= 30) {
      this.setData({
        current: current + 1 >= len ? 0 : current + 1,
        isMoving: false
      })
    }
    if (y - clientY <= -30) {
      this.setData({
        current: current - 1 <= -1 ? len - 1 : current - 1,
        isMoving: false
      })
    }
  }
})
