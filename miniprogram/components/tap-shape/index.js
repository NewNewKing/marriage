const { sleep } = require("../../utils/index.js")
let id = 0
class Heart {
  constructor() {
    this.isUsing = true
    this.left = 0
    this.top = 0
    this.color = "#f00"
    this.getId()
  }
  getId() {
    this.id = id++
  }
  getColor() {
    this.color = `hsla(${(360 * Math.random()) | 0},80%,60%,1)`
    // this.color = `rgb(${(255 * Math.random()) | 0},${(255 * Math.random()) |
    //   0},${(255 * Math.random()) | 0})`
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

// function createList() {
//   const count = 10
//   const list = new Array(count).fill(1)
//   return list.map(() => new Heart())
// }
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