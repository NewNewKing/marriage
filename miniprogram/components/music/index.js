
const behavior = require('../../framework/behavior.js')
const app = getApp()
const Event = require('../../lib/event.js')
Component({
  data: {
    hasMusic: false
  },
  behaviors: [behavior],
  methods: {
    toggle() {
      Event.emit('stateChange', {
        isMusicPlay: !this.data.isMusicPlay
      })
    }
  },
  attached() {
    const { isMusicPlay } = app.globalData.state
    const { $music } = app.globalData.info
    this.setData({
      isMusicPlay,
      hasMusic: !!$music
    })
    Event.on('infoChange', ({ $music }) => {
      if ($music) {
        this.setData({
          hasMusic: true
        })
      }
    }, this.__wxExparserNodeId__)
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
