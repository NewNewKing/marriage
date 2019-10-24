const page = require('../../framework/page.js')
const { uploadImg, delImg } = require('../../services/upload.js')
const Event = require('../../lib/event.js')
const app = getApp()
page({
  data: {},
  // 上传图片
  upload() {
    wx.chooseImage({
      count: 9,
      success(res) {
        console.log(res)
        uploadImg(res.tempFilePaths).then(res => {
          Event.emit('infoChange', {
            $photos: res
          })
        })
      }
    })
  },
  // 删除图片
  del({
    currentTarget: {
      dataset: { item }
    }
  }) {
    this.$alert('确认删除该张图片？')
      .then(() => {
        return delImg(item.id)
      })
      .then(res => {
        Event.emit('infoChange', {
          $photos: res
        })
      })
  }
})
