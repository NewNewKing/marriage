const page = require('../../framework/page.js')
const { setInfo } = require('../../services/info.js')
const Event = require('../../lib/event.js')
page({
  data: {
    url: 'https://lbs.qq.com/tool/getpoint/index.html'
  },
  submit() {
    const { $hotel, $address, $lat, $lon, $_id } = this.data
    const params = {
      id: $_id,
      data: {
        $hotel,
        $address,
        $lat,
        $lon
      }
    }
    setInfo(params).then(() => {
      Event.emit('infoChange', params.data)
    })
  },
  longPress() {
    const { url } = this.data
    wx.setClipboardData({
      data: url,
      success: () => {
        this.$hint('网址已复制')
      }
    })
  }
})
