const app = getApp()
const { showHeart, sleep, showToast, getNeedInfo } = require('./util.js')
const Event = require('./event.js')

const mixin = {
  data: {
    $ready: false,
    $style: 'black-gold'
  },
  onLoad() {
    if (app.globalData && app.globalData.info) {
      const { info } = app.globalData
      this.setData(getNeedInfo(info, this))
    }

    Event.on('infoChange', info => {
      this.setData(getNeedInfo(info, this))
    })
  },
  methods: {
    // 全屏点击出现心
    $showHeart(e) {
      const {
        detail: { x, y }
      } = e
      const component = this.selectComponent('#tap')
      component.showHeart(x, y)
    },
    // 打电话
    $phoneCall({
      currentTarget: {
        dataset: { num }
      }
    }) {
      if (num) {
        wx.makePhoneCall({
          phoneNumber: num + ''
        })
        return
      }

      showToast({
        title: `这个人太忙啦，暂时没有录入手机号`
      })
    }
  },
  onShareAppMessage() {
    const { $groom, $bride } = app.globalData.info
    return {
      title: `快来参加${$groom}和${$bride}的婚礼吧！`
    }
  }
}

module.exports = mixin
