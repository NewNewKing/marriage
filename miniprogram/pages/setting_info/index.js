const page = require('../../framework/page.js')
const { setInfo } = require('../../services/info.js')
const Event = require('../../lib/event.js')
const { uploadMusic } = require('../../services/upload.js')
const app = getApp()
page({
  data: {
    music: '',
    musicPath: ''
  },
  // 上传小程序信息
  submit() {
    const {
      $groom,
      $bride,
      $phone1,
      $phone2,
      $date1,
      $date2,
      $time,
      $_id
    } = this.data
    const params = {
      id: $_id,
      data: {
        $groom,
        $bride,
        $phone1,
        $phone2,
        $date1,
        $date2,
        $time
      }
    }
    setInfo(params).then(() => {
      Event.emit('infoChange', params.data)
    })
  },
  chooseMusic() {
    wx.chooseMessageFile({
      count: 1,
      success: ({ tempFiles }) => {
        console.log(tempFiles)
        uploadMusic(tempFiles[0].name, tempFiles[0].path)
        this.setData({
          music: tempFiles[0].name
        })
      }
    })
  }
})
