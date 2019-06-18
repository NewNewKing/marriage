const behavior = require("../../lib/behavior.js")
Component({
  data: {
    sign: "",
    timer: null
  },
  behaviors: [behavior],
  attached() {
    let count = 0
    const timer = setInterval(() => {
      console.log("loading定时器执行")
      count = count + 1 > 3 ? 0 : count + 1
      let num = count + 1,
        str = ""
      while (--num) {
        str += "·"
      }
      this.setData({
        sign: str
      })
    }, 300)

    this.setData({
      timer
    })
  },
  detached() {
    const { timer } = this.data
    clearInterval(timer)
  }
})
