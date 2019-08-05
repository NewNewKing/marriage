const hint = (msg, time) => {
  const options = {
    icon: 'none',
    title: msg,
    duration: time || 3000
  }
  wx.showToast(options)
}
module.exports = {
  hint
}
