const behavior = require('../../framework/behavior.js')
const app = getApp()
const Event = require('../../lib/event.js')
Component({
  data: {},
  behaviors: [behavior],
  methods: {
    toggle() {
      if (this.data.isMusicPlay) {
        // 正在播放
        wx.pauseBackgroundAudio()
      } else {
        // 暂停中
        wx.playBackgroundAudio()
      }
    }
  },
  attached() {
    const { isMusicPlay } = app.globalData.state
    this.setData({
      isMusicPlay
    })

    Event.on(
      'stateChange',
      ({ isMusicPlay }) => {
        this.setData({
          isMusicPlay
        })
      },
      this.__wxExparserNodeId__
    )
  },
  detached() {
    Event.off('stateChange', this.__wxExparserNodeId__)
  }
})
