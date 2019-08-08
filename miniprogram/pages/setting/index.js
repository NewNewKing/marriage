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
    // 1、信息设置  2、酒店设置 3、照片管理 4、评论管理 5、出席人数 6、彩蛋排名
    switch (+index) {
      case 1:
        url = '/pages/setting_info/index'
        break
      case 2:
        url = '/pages/setting_hotel/index'
        break
      case 3:
        url = '/pages/setting_photo/index'
        break
      case 4:
        url = '/pages/setting_comment/index'
        break
      case 5:
        url = '/pages/setting_attend/index'
        break
      case 6:
        url = '/pages/setting_egg/index'
        break
    }
    this.$go(url)
  }
})
