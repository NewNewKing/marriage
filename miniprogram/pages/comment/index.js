const { dateFormat } = require("../../lib/util.js")
const page = require("../../lib/page.js")
const comment = require("../../services/index.js")
const app = getApp()

page({
  data: {
    height: 0,
    list: [],
    userInfo: null,
    isLayerShow: false,
    value: ""
  },
  onLoad() {
    wx.getSystemInfo({
      success: ({ windowHeight }) => {
        this.setData({
          height: windowHeight - 80
        })
      }
    })
    comment.getAllList().then(list => {
      this.setData({
        list
      })
    })
  },
  commentChange(event) {
    const {
      currentTarget: { offsetLeft, offsetTop },
      detail: { value, cursor }
    } = event
    this.setData({
      value
    })
    const e = {
      detail: {
        x: offsetLeft,
        y: offsetTop
      }
    }
    this.$showHeart(e)
  },
  commentLineChange(e) {
    console.log(e)
  },
  submit() {
    const { userInfo, value, list } = this.data
    if (!this.validate()) return
    wx.showLoading({
      title: "评论提交中..."
    })
    const data = {
      name: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      comment: value,
      time: dateFormat(Date.now(), "yyyy.mm.dd HH:MM:ss")
    }
    comment.add(data).then(() => {
      list.unshift(data)
      this.setData({
        list,
        value: "",
        isLayerShow: false
      })
    })
  },
  validate() {
    const { value } = this.data
    if (!value.replace(/\s/g, "")) {
      wx.showToast({
        title: "难道你就没有话对我们说吗~",
        icon: "none"
      })
      return false
    }
    return true
  },
  getUserInfo({ detail: { userInfo } }) {
    if (!userInfo) {
      // 没有授权
      wx.showToast({
        title: "咋滴，还想匿名发言呐？",
        icon: "none"
      })
      return
    }
    console.log(userInfo)
    this.setData({
      userInfo
    })
    this.showLayer()
  },
  // layer的开关
  showLayer() {
    this.setData({
      isLayerShow: true
    })
  },
  hideLayer() {
    this.setData({
      isLayerShow: false
    })
  },
  attend() {
    wx.getSetting({
      success(res) {
        console.log(res)
      }
    })
  },
  stopEvent() {}
})
