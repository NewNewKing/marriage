const app = getApp()
const { photos } = require('../../marriage.info.js')

Page({
  data: {
    style: app.globalData.style,
    photos,
    // 展现模式
    mode: 'swiper'
  },
  showPhoto({ currentTarget: { dataset: { index } } }){
    const { photos } = this.data
    wx.previewImage({
      urls: photos,
      current: photos[index]
    })
  },
  toggleView(){
    const { mode } = this.data
    this.setData({
      mode: mode === 'swiper' ? 'scale' : 'swiper'
    })
  }
})