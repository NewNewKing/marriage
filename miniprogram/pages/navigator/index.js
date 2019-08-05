const page = require('../../framework/page.js')
page({
  data: {},
  markertap() {
    const { $lat, $lon, $hotel, $address } = this.data
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
      success: () => {
        this.$hint('详细地址已经复制')
      }
    })
  }
})
