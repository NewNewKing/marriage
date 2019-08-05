const page = require('../../framework/page.js')
const app = getApp()
page({
  data: {},
  linkAction({
    target: {
      dataset: { index }
    }
  }) {
    let url = ''
    // 1、设置信息  2、设置照片
    switch (+index) {
      case 1:
        url = '/pages/setting_info/index'
        break
      case 2:
        url = '/pages/setting_photo/index'
        break
    }
    this.$go(url)
  }
})
