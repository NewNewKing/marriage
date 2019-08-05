Component({
  properties: {
    title: {
      type: String,
      value: ''
    }
  },
  methods: {
    back() {
      wx.navigateBack({
        delta: 1,
        fail() {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    }
  }
})
