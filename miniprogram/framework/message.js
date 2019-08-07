const hint = (msg, time) => {
  const options = {
    icon: 'none',
    title: msg,
    duration: time || 3000
  }
  wx.showToast(options)
}

const alert = msg => {
  return new Promise((resolve, reject) => {
    const options = {
      content: msg,
      title: '提示',
      success({ cancel, confirm }) {
        if (confirm) {
          resolve()
        } else {
          reject()
        }
      }
    }
    wx.showModal(options)
  })
}
module.exports = {
  hint,
  alert
}
