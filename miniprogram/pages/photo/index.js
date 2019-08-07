const app = getApp()
const page = require('../../framework/page.js')
const Event = require('../../lib/event.js')

page({
  data: {
    // 展现模式
    mode: 'swiper',

    number: null,
    height: 0,
    startX: 0,
    startY: 0,
    left: 0,
    top: 0,

    userInfo: null
  },
  onLoad() {
    // 判断是否有用户信息
    if (app.globalData && app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    // 获取屏幕高度
    wx.getSystemInfo({
      success: ({ windowHeight }) => {
        this.setData({
          height: windowHeight
        })
      }
    })
    // 设置彩蛋
    this.createNumber()
    Event.on('infoChange', () => {
      this.createNumber()
    })
  },
  createNumber() {
    const { $photos } = this.data
    if (!$photos) return

    const len = $photos.length
    this.setData({
      number: Math.floor(len * Math.random())
    })
  },
  showPhoto({
    currentTarget: {
      dataset: { index }
    }
  }) {
    const { $photos } = this.data
    wx.previewImage({
      urls: $photos.map(item => item.url),
      current: $photos[index].url
    })
  },
  getUserInfo({ detail: { userInfo } }) {
    if (!userInfo) {
      // 没有授权
      this.$hint('你发现了新郎的私房钱 赶紧授权领奖励啦！')
      return
    }
    app.globalData.userInfo = userInfo
    this.setData({
      userInfo
    })
    this.moneyAction()
  },
  moneyAction() {
    this.$go('/pages/egg/index')
  },
  eggStart(e) {
    const { touches } = e
    const { top, left } = this.data
    this.setData({
      startX: touches[0].clientX - left,
      startY: touches[0].clientY - top
    })
  },
  eggMove(e) {
    const { touches } = e
    const { startX, startY } = this.data
    const { clientX, clientY } = touches[0]
    this.setData({
      left: clientX - startX,
      top: clientY - startY
    })
  },
  toggleView() {
    const { mode } = this.data
    this.setData({
      mode: mode === 'swiper' ? 'scale' : 'swiper'
    })
  }
})
