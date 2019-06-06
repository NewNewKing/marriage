const { indexBanners, bridegroom, bride, time, hotel, address} = require('../../marriage.info.js')
const { ready } = require('../../utils/index.js')
const app = getApp()

Page({
  data: {
    // 页面动画全部延迟300ms执行 否则会有bug
    ready: false,
    // 页面风格
    style: app.globalData.style,
    
    current: 0,
    isMoving: false,
    y: 0,
    animated: true,

    bgList: indexBanners,
    // 展示信息
    bridegroom,
    bride,
    time,
    hotel,
    address
  },
  onReady(){
    ready(this)
  },
  onHide(){
    this.setData({
      animated: false
    })
  },
  onShow(){
    this.setData({
      animated: true
    })
  },
  start({ changedTouches }){
    if (!changedTouches[0]) return 
    const { clientY } = changedTouches[0]
    this.setData({
      isMoving: true,
      y: clientY
    })
  },
  move({ changedTouches }){
    if (!changedTouches[0]) return 
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
  },
  onShareAppMessage(){
    return {
      title: `快来参加${bridegroom}和${bride}的婚礼吧！`
    }
  }
})
