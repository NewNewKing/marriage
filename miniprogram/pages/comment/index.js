const page = require('../../framework/page.js')
const comment = require('../../services/comment.js')
const attend = require('../../services/attend.js')
const app = getApp()

function createGetUserInfo(msg, showLayer) {
  return ({ detail: { userInfo } }) => {}
}
let ghostBlood = 5,
  isFirstShow = true

page({
  data: {
    $pageReady: false,
    height: 0,
    // 评论的列表
    list: [],
    // 用户信息
    userInfo: null,
    // 是否显示评论弹窗
    isLayerShow: false,
    // 是否显示出席弹窗
    isAttendShow: false,
    // 评论
    value: '',
    // 当前评论页数
    pageNum: 1,

    // 出席的信息
    name: '',
    mobile: '',
    remark: '',
    attendArr: ['一人出席', '两人出席', '三人出席', '三人以上'],
    index: 0,
    _id: null
  },
  onLoad() {
    console.log('load')
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
  onShow() {
    if (isFirstShow) {
      isFirstShow = false
      return
    }
    this.$showLoading('获取评论中...')
    this.getComment(1).then(() => {
      this.$hideLoading()
    })
  },
  // 获取评论信息
  getComment(pageNum) {
    let { list } = this.data
    if (pageNum === 1) {
      list = []
    }
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
      this.$hint('难道你就没有话对我们说吗~')
      return false
    }
    return true
  },
  // 出席人数改变
  numChange({ detail: { value } }) {
    this.setData({
      index: +value
    })
  },
  // 获取用户信息
  getUserInfo({
    // detail: { userInfo },
    target: {
      dataset: { type }
    }
  }) {
    let msg = '',fn
    const self = this
    // 1、评论  2、出席
    switch (+type) {
      case 1:
        msg = '咋滴，还想匿名发言呐？'
        fn = this.showLayer
        break
      case 2:
        msg = '你得让我知道你是谁呀😂'
        fn = this.showAttend
        break
    }
    if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      fn()
      return 
    }
    
    
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '获取头像昵称',
      success({userInfo}){
        self.setData({
          userInfo
        })
        app.globalData.userInfo = userInfo
        fn()
      },
      fail(){
        // 没有授权
        self.$hint(msg)
      }
    })
  },
  // 提交出席信息
  submitAttend() {
    const { name, mobile, index, remark, userInfo, _id } = this.data
    if (!name) {
      return this.$hint('请输入姓名')
    }
    if (!mobile) {
      return this.$hint('请输入手机号码')
    }
    const attendInfo = {
      name,
      mobile,
      attendNum: index + 1,
      remark
    }
    let service,
      params = { attendInfo }
    if (!_id) {
      service = attend.add
      params = {
        userInfo,
        attendInfo
      }
    } else {
      service = attend.update
      params = {
        id: _id,
        data: attendInfo
      }
    }
    service(params).then(() => {
      this.hideAttend()
    })
  },
  getAttendInfo() {
    wx.showLoading({
      title: '信息加载中...'
    })
    attend
      .get()
      .then(res => {
        if (!res) {
          const { userInfo } = this.data
          this.setData({
            name: userInfo.nickName,
            remark: '新婚快乐'
          })
          return
        }
        const { attendInfo, _id } = res
        const { attendNum, mobile, name, remark } = attendInfo
        this.setData({
          index: attendNum - 1,
          _id,
          mobile,
          name,
          remark
        })
      })
      .finally(() => {
        wx.hideLoading()
      })
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
  showAttend() {
    this.setData({
      isAttendShow: true
    })
    this.getAttendInfo()
  },
  hideAttend() {
    this.setData({
      isAttendShow: false
    })
  },
  ghostAction() {
    if (--ghostBlood <= 0) {
      ghostBlood = 5
      this.$go('/pages/setting/index')
    }
  }
})
