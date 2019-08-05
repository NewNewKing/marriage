const page = require('../../framework/page.js')
const app = getApp()
page({
  data: {},
  onLoad() {
    console.log(app)
  },
  getUserInfo({ detail: { userInfo } }) {
    console.log(userInfo)
  }
})
