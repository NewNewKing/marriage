const Event = require('./lib/event.js')
const { getInfo } = require('./lib/global.js')

//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'test-nnhi8',
        traceUser: true
      })
    }
    // global数据
    this.globalData = {
      // 全局的状态
      state: {
        // 音乐播放
        isMusicPlay: false
      },
      // 全局的信息（婚礼信息等）
      info: {}
    }
    // 全局状态改变
    Event.on('stateChange', data => {
      Object.assign(this.globalData.state, data)
    })
    // 全局信息改变
    Event.on('infoChange', info => {
      Object.assign(this.globalData.info, info)

      // 背景音乐
      if (info.$music) {
        const music = info.$music
        wx.playBackgroundAudio({
          dataUrl: music.url
        })
        wx.onBackgroundAudioPlay(() => {
          Event.emit('stateChange', { isMusicPlay: true })
        })
        wx.onBackgroundAudioPause(() => {
          Event.emit('stateChange', { isMusicPlay: false })
        })
      }
    })
    // 获取全局配置信息
    getInfo(this)
  }
})
