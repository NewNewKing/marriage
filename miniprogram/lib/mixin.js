const app = getApp()
const { showHeart, sleep } = require("./util.js")
const info = require("../marriage.info.js")
const mixin = {
  data: {
    $ready: false,
    $markers: [
      {
        id: 1,
        latitude: info.$lat,
        longitude: info.$lon,
        iconPath: "/images/nav.png",
        width: 50,
        height: 50
      }
    ]
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

      wx.showToast({
        title: `这个人太忙啦，暂时没有录入手机号`,
        icon: "none"
      })
    }
  },
  onLoad() {
    sleep(300).then(() => {
      this.setData({
        $ready: true
      })
    })
  },
  onShareAppMessage() {
    return {
      title: `快来参加${$groom}和${$bride}的婚礼吧！`
    }
  }
}

Object.assign(mixin.data, info)

module.exports = mixin
