const page = require('../../framework/page.js')
const { getList } = require('../../services/egg.js')
page({
  data: {
    pageNum: 1,
    pageSize: 20,
    list: []
  },
  onLoad() {
    wx.getSystemInfo({
      success: ({ windowHeight }) => {
        this.setData({
          height: windowHeight - 90
        })
      }
    })
    this.getList(1)
  },
  // 滚动到底部
  scrollToLower() {
    const { pageNum } = this.data
    this.getList(pageNum + 1)
  },
  // 获取列表
  getList(pageNum) {
    const { pageSize, list } = this.data
    return getList({ pageNum, pageSize }).then(res => {
      this.setData({
        pageNum,
        list: list.concat(res)
      })
    })
  }
})
