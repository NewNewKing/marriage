const { dateFormat, showToast } = require('../../lib/util.js')
const page = require('../../framework/page.js')
const comment = require('../../services/comment.js')
const app = getApp()

page({
  data: {
    $pageReady: false,
    height: 0,
    list: [],
    userInfo: null,
    isLayerShow: false,
    value: '',

    pageNum: 1
  },
  onLoad() {
    wx.getSystemInfo({
      success: ({ windowHeight }) => {
        this.setData({
          height: windowHeight - 80
        })
      }
    })
    // 获取评论
    this.getComment(1).then(() => {
      // 如果直接进入评论页 评论加载完成 但是信息还未加载完成
      this.setData({
        $pageReady: true
      })
    })
  },
  // 获取评论信息
  getComment(pageNum) {
    const { list } = this.data
    return comment.getList({ pageNum }).then(res => {
      if (res.length) {
        this.setData({
          list: list.concat(res),
          pageNum
        })
      }
    })
  },
  // 滚动到底时
  scrollToLower() {
    wx.showLoading({
      title: '评论加载中...'
    })
    const { pageNum, list } = this.data

    this.getComment(pageNum + 1)
  },
  // 输入文字时 产生小星星
  commentChange(event) {
    const {
      currentTarget: { offsetLeft, offsetTop },
      detail: { value, cursor }
    } = event
    this.setData({
      value
    })
    this.$showHeart(offsetLeft, offsetTop)
  },
  // 提交评论
  submit() {
    const { userInfo, value, list } = this.data
    if (!this.validate()) return
    wx.showLoading({
      title: '评论提交中...'
    })
    comment.add(Object.assign({}, userInfo, { comment: value })).then(data => {
      list.unshift(data)
      this.setData({
        list,
        value: '',
        isLayerShow: false
      })
    })
  },
  // 校验评论内容
  validate() {
    const { value } = this.data
    if (!value.replace(/\s/g, '')) {
      showToast({
        title: '难道你就没有话对我们说吗~'
      })
      return false
    }
    return true
  },
  // 获取用户信息
  getUserInfo({ detail: { userInfo } }) {
    if (!userInfo) {
      // 没有授权
      showToast({
        title: '咋滴，还想匿名发言呐？'
      })
      return
    }
    console.log(userInfo)
    this.setData({
      userInfo
    })
    this.globalData.userInfo = userInfo
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
  }
})
