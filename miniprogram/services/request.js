const map = {}
const api = (url, data = {}) => {
  if (map[url]) {
    wx.showLoading({
      title: "不要着急嘛..."
    })
  }
  map[url] = true
  return wx.cloud
    .callFunction({
      name: "api",
      data: {
        url,
        data
      }
    })
    .then(({ result }) => {
      map[url] = false
      wx.hideLoading()

      const { code, data, msg } = result
      // 0、成功 1、失败 2、成功但是要显示msg
      if (code !== 0) {
        wx.showToast({
          title: msg,
          icon: "none",
          duration: 3000
        })
      }
      if (code === 1) {
        return Promise.reject(msg)
      } else {
        return data
      }
    })
    .catch(err => {
      map[url] = false
      wx.hideLoading()
      return Promise.reject(err)
    })
}

module.exports = {
  api
}
