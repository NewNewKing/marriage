const app = getApp()
const Event = require('../lib/event.js')

const options = {
  data: {
    $style: 'black-gold'
  },
  attached() {
    const { $style } = app.globalData.info
    $style &&
      this.setData({
        $style
      })
    Event.on(
      'infoChange',
      ({ $style }) => {
        $style &&
          this.setData({
            $style
          })
      },
      this.__wxExparserNodeId__
    )
  },
  detached() {
    Event.off('infoChange', this.__wxExparserNodeId__)
  }
}

module.exports = Behavior(options)
