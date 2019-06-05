function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
function ready(page){
  sleep(300).then(() => {
    page.setData({
      ready: true
    })
  })
}

module.exports = {
  sleep,
  ready
}