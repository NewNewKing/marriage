const {
  lon,
  lat,
  hotel,
  address,
  phone1,
  phone2,
  groom,
  bride
} = require("../../marriage.info.js")
const { ready, showHeart } = require("../../utils/index.js")
const app = getApp()

Page({
  data: {
    style: app.globalData.style,
    ready: false,
    lon,
    lat,
    hotel,
    address,
    markers: [
      {
        id: 1,
        latitude: lat,
        longitude: lon,
        iconPath: "/images/nav.png",
        width: 50,
        height: 50
      }
    ]
  },
  showHeart(e) {
    showHeart(this, e)
  },
  onReady() {
    ready(this)
  },
  markertap() {
    wx.openLocation({
      latitude: lat,
      longitude: lon,
      hotel,
      address
    })
  },
  makecall({
    currentTarget: {
      dataset: { sex }
    }
  }) {
    let number,
      name = "新人"
    switch (sex) {
      case "male":
        number = phone1
        name = "新郎"
        break
      case "female":
        number = phone2
        name = "新娘"
        break
    }
    if (number) {
      wx.makePhoneCall({
        phoneNumber: number + ""
      })
      return
    }

    wx.showToast({
      title: `${name}暂时没有填入手机号`,
      icon: "none"
    })
  },
  onShareAppMessage() {
    return {
      title: `快来参加${groom}和${bride}的婚礼吧！`
    }
  }
})
