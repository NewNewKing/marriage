const { showToast } = require('../lib/util.js')
const map = {}
const api = (url, data = {}) => {
  if (map[url]) {
    wx.showLoading({
      title: '不要着急嘛...'
    })
    return Promise.reject()
  }
  map[url] = true
  return wx.cloud
    .callFunction({
      name: 'api',
      data: {
        url,
        data
      }
    })
    .catch(err => {
      map[url] = false
      wx.hideLoading()
      showToast({
        title: (err && err.errorMessage) || '网络错误啦 QoQ!'
      })
      return Promise.reject(err)
    })
    .then(({ result }) => {
      map[url] = false
      wx.hideLoading()

      const { code, data, msg } = result
      // 0、成功 1、失败 2、成功但是要显示msg
      if (code !== 0) {
        showToast({
          title: msg
        })
      }
      if (code === 1) {
        return Promise.reject(msg)
      } else {
        return data
      }
    })
}

module.exports = {
  api
}
