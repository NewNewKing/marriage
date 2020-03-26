const page = require('../../framework/page.js')
const egg = require('../../services/egg.js')
const app = getApp()
function getImageInfo(src) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

function getSystemInfo() {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

page({
  data: {
    $pageReady: false,
    userInfo: '',
    tempFilePath: '',

    // 是否拒绝保存到相册
    isRefuse: false
  },
  onLoad() {
    const userInfo = {
      avatarUrl:
        'https://wx.qlogo.cn/mmopen/vi_32/295czzN8HT3MU8rZdAuwn8wU35ArrKz33uFJteicp6BCcgZ755oOaHetczlTjOIRS18x04RZkkLvYmM7picC08Mw/132',
      city: '成都',
      country: '中国',
      gender: 1,
      language: 'zh_CN',
      nickName: '王兴欣',
      province: '四川'
    }
    // const { userInfo } = app.globalData
    this.setData({
      userInfo
    })
  },
  onReady() {
    Promise.all([
      egg.clue(this.data.userInfo),
      getImageInfo(this.data.userInfo.avatarUrl),
      getSystemInfo()
    ]).then(res => {
      this.setData({
        $pageReady: true
      })
      const ctx = wx.createCanvasContext('export')
      const [info, { path: avatar }, { screenWidth }] = res
      const params = {
        avatar,
        nickName: this.data.userInfo.nickName,
        r: screenWidth / 375,
        money: info.money / 100,
        rank: info.rank
      }
      this.draw(ctx, params)
    })
  },
  // 保存图片
  save() {
    const { tempFilePath } = this.data
    if (tempFilePath) {
      return this.savePicture(tempFilePath)
    }
    this.toImg().then(img => {
      this.savePicture(img)
    })
  },
  // canvas to img
  toImg() {
    return new Promise(resolve => {
      wx.canvasToTempFilePath({
        canvasId: 'export',
        quality: 1,
        success: ({ tempFilePath }) => {
          this.setData({
            tempFilePath
          })
          resolve(tempFilePath)
        }
      })
    })
  },
  // 微信保存图片方法
  savePicture(url) {
    wx.saveImageToPhotosAlbum({
      filePath: url,
      success: () => {
        this.$hint('保存成功！')
      },
      fail: () => {
        this.setData({
          isRefuse: true
        })
        this.$hint('保存失败！，若要继续操作请先进入设置页授权')
      }
    })
  },
  // 画出页面
  draw(ctx, info) {
    const { r, avatar, nickName, rank } = info
    ctx.beginPath()
    ctx.setFillStyle('#242424')
    ctx.fillRect(0, 0, 300 * r, 420 * r)
    ctx.closePath()
    ctx.setTextAlign('center')
    ctx.setTextBaseline('top')
    ctx.setFillStyle('#eccb90')
    ctx.setFontSize(20 * r)
    ctx.fillText('新郎 👇👇👇', 150 * r, 10 * r)
    ctx.drawImage('/images/cry.jpg', 75 * r, 50 * r, 150 * r, 150 * r)
    ctx.fillText('🎉 恭喜 🎉', 150 * r, 250 * r)
    // 画头像和昵称
    ctx.save()
    let { width } = ctx.measureText(nickName)
    width = width / r
    if (width > 230) {
      width = 230
    }
    const release = 300 - width - 50 - 20
    const x = release / 2

    ctx.beginPath()
    ctx.arc(x * r + 25 * r, 325 * r, 25 * r, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(avatar, x * r, 300 * r, 50 * r, 50 * r)
    ctx.restore()
    ctx.fillText(nickName, (x + 50 + 20 + width / 2) * r, 315 * r, width * r)

    ctx.setFontSize(16 * r)
    ctx.fillText(`第 ${rank} 位发现新郎的私房钱`, 150 * r, 380 * r)

    ctx.draw(false, () => {
      this.toImg()
    })
  },
  openSetting() {
    wx.openSetting()
  }
})
