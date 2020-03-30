const behavior = require('../../framework/behavior.js')
const { getFlashTime, flow, sleep } = require('../../lib/util.js')
Component({
  behaviors: [behavior],
  properties: {
    texts: {
      type: Array,
      value: []
    },
    photos: {
      type: Array,
      value: []
    }
  },
  data: {
    // 每一帧flash的状态  'in', 'duration', 'out'
    $flashStatus: 'in',
    stage: 0
  },
  methods: {
    animationend() {
      // return
      const { texts, stage, $flashStatus } = this.data
      const item = texts[stage]
      if (!item) {
        this.triggerEvent('end', true)
        return
      }
      if ($flashStatus === 'in') {
        sleep(item.duration * 1000).then(() => {
          this.setData(
            {
              $flashStatus: 'out'
            },
            () => {
              // 如果没有out动画 则认为 out结束
              !item.outName && this.animationend()
            }
          )
        })
      } else {
        this.setData(
          {
            stage: stage + 1,
            $flashStatus: 'in'
          },
          () => {
            const item = texts[stage + 1] || {}
            // 如果没有in动画 则认为 out结束
            !item.inName && this.animationend()
          }
        )
      }
    }
  },
  attached() {},
  ready() {}
})
