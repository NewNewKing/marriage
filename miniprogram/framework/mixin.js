const app = getApp()
const { showHeart, sleep, getNeedInfo } = require('../lib/util.js')
const { hint, alert } = require('./message.js')
const Event = require('../lib/event.js')

const mixin = {
  data: {
    // 是否已经从服务器获取到配置信息
    $ready: false,
    // 页面是否已经准备好
    $pageReady: true,
    $style: 'black-gold'
  },
  // 在onReady获取数据 是因为 $ready必须在页面渲染好之后才能设置为ture
  // 否则会导致页面动画bug
  onReady() {
    if (app.globalData && app.globalData.info) {
      const { info } = app.globalData
      sleep(100).then(() => {
        this.setData(getNeedInfo(info, this))
      })
    }

    Event.on(
      'infoChange',
      info => {
        this.setData(getNeedInfo(info, this))
      },
      this.route
    )
  },
  onUnload() {
    Event.off('infoChange', this.route)
  },
  methods: {
    setValue(event) {
      const {
        currentTarget: {
          offsetLeft,
          offsetTop,
          dataset: { name }
        },
        detail: { value }
      } = event

      this.setData({
        [name]: value
      })
      this.$showHeart(offsetLeft, offsetTop)
    },
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
    // 弱提示
    $hint(msg, time) {
      hint(msg, time)
    },
    $alert(msg) {
      return alert(msg)
    },
    $go(url, replace) {
      if (replace) {
        wx.redirectTo({ url })
      } else {
        wx.navigateTo({ url })
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
      this.$hint(`这个人太忙啦，暂时没有录入手机号`)
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
