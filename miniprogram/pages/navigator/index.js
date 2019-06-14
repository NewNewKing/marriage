const page = require("../../lib/page.js")
page({
  data: {},
  markertap() {
    const { $lat, $lon, $hotel, $address } = this
    wx.openLocation({
      latitude: $lat,
      longitude: $lon,
      $hotel,
      $address
    })
  }
})
