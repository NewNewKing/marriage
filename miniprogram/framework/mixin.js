const app = getApp()
const { showHeart, sleep, showToast, getNeedInfo } = require('../lib/util.js')
const Event = require('../lib/event.js')

const mixin = {
  data: {
    // 是否已经从服务器获取到配置信息
    $ready: false,
    // 页面是否已经准备好
    $pageReady: true,
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
    $showHeart(e, y) {
      const component = this.selectComponent('#tap')
      // 主动调用
      if (y) {
        component.showHeart(e, y)
        return
      }
      // 点击调用
      const { touches } = e
      if (touches && touches.length) {
        touches.forEach(item => {
          const { clientX, clientY } = item
          component.showHeart(clientX, clientY)
        })
      }
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
