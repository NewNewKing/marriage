const page = require('../../lib/page.js')
const { flow, getFlashTime } = require('../../lib/util.js')
const Event = require('../../lib/event.js')
const app = getApp()

page({
  data: {
    // 当前第几幕
    stage: 0,
    // 页面风格
    isShowCover: true,
    isFirst: true,
    current: 0,
    isMoving: false,
    y: 0
  },
  onLoad() {
    const { $ready } = this.data

    if (!$ready) {
      Event.on('infoChange', ({ $ready }) => {
        if (!$ready) return
        this.startStage()
      })
    } else {
      this.startStage()
    }
  },
  // 开始图片播放
  startStage() {
    const { $indexFlashTexts } = this.data
    console.log(getFlashTime($indexFlashTexts, true))
    const times = [4, getFlashTime($indexFlashTexts, true)]
    flow(times, this)
  },
  toggleCover({
    currentTarget: {
      dataset: { type }
    }
  }) {
    const { isShowCover } = this.data
    if (type === 'swiper' && !isShowCover) {
      return
    }
    this.setData({
      isFirst: false,
      isShowCover: !isShowCover
    })
  },
  start({ changedTouches }) {
    if (!changedTouches[0]) return
    const { clientY } = changedTouches[0]
    this.setData({
      isMoving: true,
      y: clientY
    })
  },
  move({ changedTouches }) {
    if (!changedTouches[0]) return
    const { clientY } = changedTouches[0]
    const { y, isMoving, current, $indexBanners } = this.data
    const len = $indexBanners.length

    if (!isMoving) {
      return
    }
    if (y - clientY >= 30) {
      this.setData({
        current: current + 1 >= len ? 0 : current + 1,
        isMoving: false
      })
    }
    if (y - clientY <= -30) {
      this.setData({
        current: current - 1 <= -1 ? len - 1 : current - 1,
        isMoving: false
      })
    }
  }
})
