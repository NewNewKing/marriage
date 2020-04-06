const app = getApp()
const page = require('../../framework/page.js')
const Event = require('../../lib/event.js')

let timer
let ghostBlood = 5
function setData(data, page) {
  if (timer) return
  timer = setTimeout(() => {
    page.setData(data)
    clearTimeout(timer)
    timer = null
  }, 50)
}
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
    photos: [],

    userInfo: null
  },
  onReady() {
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
    this.$showLoading('获取图片中...')
    setTimeout(() => {
      this.createNumber()
      this.setPhotos()
    }, 300)
    Event.on('infoChange', () => {
      this.createNumber()
      this.setPhotos()
    })
  },
  setPhotos() {
    const { $photos } = this.data
    if (!$photos || !$photos.length) return
    this.setData({
      photos: $photos.map((item, index) => {
        // 0.3秒一张图片
        index = index * 3
        item.delay = `delay-${Math.floor(index / 10)}-${index % 10}s`
        item.eggDelay = `delay-${Math.floor(index / 10) + 3}-${index % 10}s`
        return item
      })
    }, () => {
      this.$hideLoading()
    })
  },
  showNumber({
    currentTarget: {
      dataset: { index }
    }
  }) {
    if (index == 4 && --ghostBlood <= 0) {
      ghostBlood = 5
      this.$hint(this.data.number)
    }
  },
  createNumber() {
    setTimeout(() => {
      const { $photos } = this.data
      let len
      if (!$photos || !$photos.length) {
        len = 20
      }else {
        len = $photos.length
      }
      this.setData({
        number: Math.floor(len * Math.random())
      })
    }, 100)
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
    setData(
      {
        left: clientX - startX,
        top: clientY - startY
      },
      this
    )
  },
  toggleView() {
    const { mode } = this.data
    if (mode === 'swiper') {
      wx.showToast({
        title: '听说新郎喜欢藏私房钱\n🤔🤔🤔',
        icon: 'none'
      })
    }
    this.setData({
      mode: mode === 'swiper' ? 'scale' : 'swiper'
    })
  }
})
