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
    // 因为每次
    Event.on(
      "infoChange",
      info => {
        this.setData({
          $style: info.$style
        })
      },
      this.__wxExparserNodeId__
    )
  },
  detached() {
    Event.off("infoChange", this.__wxExparserNodeId__)
  }
}

module.exports = Behavior(options)
