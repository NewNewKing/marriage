const page = require('../../framework/page.js')
const { getList, updateList, getAllList } = require('../../services/comment.js')
page({
  data: {
    // 1、全部评论 2、已删除
    active: 1,
    // 所有评论
    allList: [],
    // 被删除的评论
    delList: [],
    pageNum: 1
  },
  onLoad() {
    wx.getSystemInfo({
      success: ({ windowHeight }) => {
        this.setData({
          height: windowHeight - 160
        })
      }
    })

    getAllList().then(res => {
      this.setData({
        allList: res
      })
    })
  },
  // 获取删除列表
  getDelList() {
    const { pageNum, delList } = this.data
    getList({
      pageNum,
      isDel: true
    }).then(res => {
      this.setData({
        delList: delList.concat(res)
      })
    })
  },
  // 删除评论
  del({
    currentTarget: {
      dataset: { item }
    }
  }) {
    this.$alert(`确认删除${item.nickName}的该条评论吗？`)
      .then(() => {
        const params = {
          ids: [item._id],
          data: {
            isDel: true
          }
        }
        return updateList(params)
      })
      .then(() => {
        const { allList } = this.data
        this.$hint('删除成功')
        this.setData({
          allList: allList.filter(comment => comment._id !== item._id)
        })
      })
  },
  // 恢复评论
  remain({
    currentTarget: {
      dataset: { item }
    }
  }) {
    this.$alert(`确认要恢复${item.nickName}的该条评论吗？`)
      .then(() => {
        const params = {
          ids: [item._id],
          data: {
            isDel: false
          }
        }
        return updateList(params)
      })
      .then(() => {
        const { allList, delList } = this.data
        allList.push(item)
        this.$hint('恢复成功')
        this.setData({
          allList,
          delList: delList.filter(del => del._id !== item._id)
        })
      })
  },
  toggleLabel({
    currentTarget: {
      dataset: { index }
    }
  }) {
    this.setData({
      active: +index
    })
    if (+index === 2) {
      this.setData({
        pageNum: 1,
        delList: []
      })
      this.getDelList()
    }
  }
})
