const { sleep } = require('../../lib/util.js')
let id = 0
class Heart {
  constructor() {
    this.isUsing = true
    this.left = 0
    this.top = 0
    this.color = '#f00'
    this.getId()
  }
  getId() {
    this.id = id++
  }
  getColor() {
    this.color = `hsla(${(360 * Math.random()) | 0},80%,60%,1)`
  }
  getPosition(left, top) {
    this.left = left
    this.top = top
  }
  use(left, top, page) {
    this.isUsing = true
    this.getPosition(left, top)
    this.getColor()
    sleep(2000).then(() => {
      this.isUsing = false
      const { list } = page.data
      page.setData({
        list
      })
    })
  }
}
Component({
  data: {
    list: []
  },
  methods: {
    showHeart(x, y) {
      const { list } = this.data
      let item = list.find(item => !item.isUsing)
      if (!item) {
        item = new Heart()
        list.push(item)
      }
      item.use(x, y, this)
      this.setData({
        list
      })
    }
  }
})
