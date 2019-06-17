const app = getApp()
const { showHeart, sleep, showToast } = require("./util.js")
const Event = require("./event.js")

function getMarker({ $lat, $lon }) {
  return [
    {
      id: 1,
      latitude: $lat,
      longitude: $lon,
      iconPath: "/images/nav.png",
      width: 50,
      height: 50
    }
  ]
}

const mixin = {
  data: {
    $ready: false
  },
  onLoad() {
    if (app.globalData && app.globalData.info) {
      const { info } = app.globalData
      this.setData({
        $ready: true,
        ...info,
        $markers: getMarker(info)
      })
    }
    Event.on("infoChange", info => {
      this.setData({
        $ready: true,
        ...info,
        $markers: getMarker(info)
      })
    })
  },
  methods: {
    // 全屏点击出现心
    $showHeart(e) {
      const {
        detail: { x, y }
      } = e
      const component = this.selectComponent("#tap")
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
          phoneNumber: num + ""
        })
        return
      }

      showToast({
        title: `这个人太忙啦，暂时没有录入手机号`
      })
    }
  },
  onShareAppMessage() {
    return {
      title: `快来参加${$groom}和${$bride}的婚礼吧！`
    }
  }
}

module.exports = mixin
