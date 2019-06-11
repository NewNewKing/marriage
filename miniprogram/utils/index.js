function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
function ready(page) {
  sleep(300).then(() => {
    page.setData({
      ready: true
    })
  })
}

function showHeart(page, e) {
  const {
    detail: { x, y }
  } = e
  const component = page.selectComponent("#tap")
  component.showHeart(x, y)
}

module.exports = {
  sleep,
  ready,
  showHeart
}
