const app = getApp()
const Event = require("./event.js")

const options = {
  data: {
    $style: "black-gold"
  },
  attached() {
    if (app.globalData && app.globalData.info) {
      const { $style } = app.globalData.info
      this.setData({
        $style
      })
    }
    Event.on("infoChange", info => {
      this.setData({
        $style: info.$style
      })
    })
  }
}

module.exports = Behavior(options)
