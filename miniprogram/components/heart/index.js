const behavior = require("../../lib/behavior.js")
Component({
  properties: {
    count: {
      type: Number,
      value: 1
    },
    double: {
      type: Boolean,
      value: false
    }
  },
  data: {
    countArray: []
  },
  behaviors: [behavior],
  methods: {
    setCount(value) {
      this.setData({
        countArray: new Array(value).fill(1)
      })
    }
  },
  observers: {
    count(value) {
      this.setCount(value)
    }
  },
  attached() {
    this.setCount(this.data.count)
  }
})
