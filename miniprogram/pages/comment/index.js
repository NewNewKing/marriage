const { ready, showHeart } = require("../../utils/index.js")
const app = getApp()

Page({
  data: {
    style: app.globalData.style
  },
  showHeart(e) {
    showHeart(this, e)
  }
})
