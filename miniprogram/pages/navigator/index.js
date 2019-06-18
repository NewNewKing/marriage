const page = require("../../lib/page.js")
const { showToast } = require("../../lib/util.js")
page({
  data: {},
  markertap() {
    const { $lat, $lon, $hotel, $address } = this.data
    console.log()
    wx.openLocation({
      latitude: $lat,
      longitude: $lon,
      name: $hotel,
      address: $address
    })
  },
  longPress() {
    const { $address } = this.data
    wx.setClipboardData({
      data: $address,
      success() {
        showToast({
          title: "详细地址已经复制"
        })
      }
    })
  }
})
