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
        delta: 1
      })
    }
  }
})
