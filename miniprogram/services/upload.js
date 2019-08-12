const { setInfo } = require('./info.js')
const { hint } = require('../framework/message.js')

const uploadImg = filePaths => {
  const ids = []
  // 上传图片
  let resolve = Promise.resolve()
  for (let i = 0; i < filePaths.length; i++) {
    resolve = resolve.then(() => {
      const path = filePaths[i]
      const arr = path.split('.').reverse()
      const cloudPath = `photo/${arr[1].replace(/[\/:]/g, '')}.${arr[0]}`
      // const cloudPath = '/photo'
      if (i === 0) {
        wx.showLoading({
          title: `正在上传第1张图片`,
          mask: true
        })
      }
      return uploadSingleImg(cloudPath, path)
        .then(id => {
          wx.showLoading({
            title: `正在上传第${i + 2}张图片`,
            mask: true
          })
          ids.push(id)
        })
        .catch(err => {
          wx.showLoading({
            title: `正在上传第${i + 2}张图片`,
            mask: true
          })
        })
    })
  }

  // 获取真实链接地址
  resolve = resolve.then(() => {
    wx.showLoading({
      title: `正在获取链接地址`,
      mask: true
    })
    return getUrl(ids)
  })
  // 存储数据库
  let page = getCurrentPages()
  page = page[page.length - 1]
  const { $_id, $photos } = page.data
  resolve = resolve.then(res => {
    if (!res.length) return Promise.reject('上传失败')
    wx.showLoading({
      title: `数据保存中...`,
      mask: true
    })
    $photos.push(...res)
    return setInfo({
      id: $_id,
      data: {
        $photos
      }
    })
  })

  // 返回数据
  resolve = resolve
    .then(() => {
      wx.hideLoading()
      return $photos
    })
    .catch(err => {
      wx.hideLoading()
      hint(err)
      return Promise.reject(err)
    })
  return resolve
}

// 上传单张照片
const uploadSingleImg = (cloudPath, filePath) => {
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success(res) {
        resolve(res.fileID)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
// 获取链接地址
const getUrl = ids => {
  return new Promise((resolve, reject) => {
    wx.cloud.getTempFileURL({
      fileList: ids,
      success({ fileList }) {
        resolve(
          fileList.map(item => {
            return {
              id: item.fileID,
              url: item.tempFileURL
            }
          })
        )
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

const delImg = id => {
  // 修改数据库
  let page = getCurrentPages()
  page = page[page.length - 1]
  let { $_id, $photos } = page.data
  $photos = $photos.filter(item => item.id !== id)
  const params = {
    id: $_id,
    data: {
      $photos
    }
  }
  return Promise.all([setInfo(params), del([id]).catch(null)]).then(
    () => $photos
  )

  return
}
const del = ids => {
  return new Promise((resolve, reject) => {
    wx.cloud.deleteFile({
      fileList: ids,
      success({ fileList }) {
        resolve(fileList.map(item => item.fileID))
      },
      fail() {
        reject()
      }
    })
  })
}

module.exports = {
  uploadImg,
  delImg
}
