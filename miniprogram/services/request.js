const map = {}
const comment = (url, data = {}) => {
  if (map[url]) {
    wx.showLoading({
      title: "不要着急嘛..."
    })
  }
  map[url] = true
  return wx.cloud
    .callFunction({
      name: "comment",
      data: {
        url,
        data
      }
    })
    .then(({ result }) => {
      wx.hideLoading()
      return result
    })
    .catch(err => {
      wx.hideLoading()
      return new Error(err)
    })
}

module.exports = {
  comment
}
