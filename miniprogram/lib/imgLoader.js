// 读取图片
class ImgLoader {
  // 读取单个图片
  static single(url) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
      // const img = new Image()
      // img.onload = function() {
      //   resolve(img)
      // }
      // img.onerror = reject
      // img.src = url
    })
  }

  // 读取图片对象
  static many(imgs) {
    const promises = []
    for (let key in imgs) {
      promises.push(this.single(imgs[key], key))
    }

    return Promise.all(promises)
  }

  // 读取多张图片     图片列表   每张加载完回调  最大并发
  static limitMany({ imgList, handler, limit }) {
    const sequence = imgList.slice()
    let count = 0
    const promises = []

    const load = () => {
      if (sequence.length <= 0 || count > limit) return
      count += 1
      const url = sequence.shift()
      return this.single(url)
        .catch(err => {
          console.log(url, err)
          // 以后可以当某张图片加载失败后 重新加载
        })
        .then(() => {
          count -= 1
          handler && handler(url)
        })
        .then(() => load())
    }

    for (let i = 0; i < limit && 0 < sequence.length; i++) {
      promises.push(load())
    }

    return Promise.all(promises)
  }
}

module.exports = ImgLoader
