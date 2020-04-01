const Event = require('./lib/event.js')
const { getInfo } = require('./lib/global.js')
const setTabBar = require('./lib/setTabBar.js')

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
      info: {},
      audio: null,
      /**
       *  是否为用户的动作 
       *  wx.xx 等一些API会触发小程序的APP onShow onHide 回调
       *  比如wx.previewImage, wx.chooseImage，实际业务屏蔽这种回调
       *  玛德  真机对createInnerAudioContext无效
       */
      isUserAction: false
    }
    // 创建背景音乐
    const audio = wx.createInnerAudioContext()
    audio.autoplay = true
    audio.loop = true
    this.globalData.audio = audio

    // 全局状态改变
    Event.on('stateChange', data => {
      Object.assign(this.globalData.state, data)
      if (data.isMusicPlay) {
        audio.play()
      }else {
        audio.pause()
      }
    })

    // 全局信息改变
    Event.on('infoChange', info => {
      // info.$style && setTabBar(info.$style)
      Object.assign(this.globalData.info, info)

      // 背景音乐
      if (info.$music) {
        const music = info.$music
        audio.src = music.url
        audio.play()
        // 延迟100ms 让动画效果出现
        setTimeout(() => {
          Event.emit('stateChange', { isMusicPlay: true })
        }, 100)
      }
    })
    // 获取全局配置信息
    getInfo(this)
  },
  onHide() {
    const { isUserAction, audio } = this.globalData
    if (!isUserAction) {
      audio.pause()
    }
  },
  onShow() {
    const { isUserAction, audio } = this.globalData
    if (!isUserAction) {
      audio.play()
    }
    this.globalData.isUserAction = false
  }
})
