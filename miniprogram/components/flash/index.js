const behavior = require("../../lib/behavior.js")
const { getFlashTime, flow } = require("../../lib/util.js")
Component({
  behaviors: [behavior],
  properties: {
    texts: {
      type: Array,
      value: []
    }
  },
  data: {
    // 每一帧flash的状态  'in', 'duration', 'out'
    $flashStatus: "",
    stage: 0
  },
  attached() {},
  ready() {
    const { texts } = this.data
    const times = getFlashTime(texts)
    flow(times, this)
  }
})
