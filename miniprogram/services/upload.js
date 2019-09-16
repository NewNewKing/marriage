const { setInfo } = require('./info.js')
const { hint } = require('../framework/message.js')

// 保存数据信息
const saveData = data => {
  let page = getCurrentPages()
  page = page[page.length - 1]
  const { $_id } = page.data
  wx.showLoading({
    title: `数据保存中...`,
    mask: true
  })
  return setInfo({
    id: $_id,
    data
  })
}

// 上传单个文件
const uploadFile = (cloudPath, filePath) => {
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
  wx.showLoading({
    title: `正在获取链接地址`,
    mask: true
  })
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
const getFileName = name => {
  const arr = name.split('.').reverse()
  return `${encodeURIComponent(arr[1])}.${arr[0]}`
}

const uploadImg = filePaths => {
  const ids = []
  // 上传图片
  let resolve = Promise.resolve()
  for (let i = 0; i < filePaths.length; i++) {
    resolve = resolve.then(() => {
      const cloudPath = `photo/${getFileName(filePaths[i])}`
      if (i === 0) {
        wx.showLoading({
          title: `正在上传第1张图片`,
          mask: true
        })
      }
      return uploadFile(cloudPath, path)
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
    return getUrl(ids)
  })
  // 存储数据库
  let page = getCurrentPages()
  page = page[page.length - 1]
  const { $_id, $photos } = page.data
  resolve = resolve.then(res => {
    if (!res.length) return Promise.reject('上传失败')
    $photos.push(...res)
    return saveData({ $photos })
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

const uploadMusic = (name, filePath) => {
  const fileName = getFileName(name)
  const cloudPath = `music/${fileName}`
  wx.showLoading({
    title: `上传中...`,
    mask: true
  })
  uploadFile(cloudPath, filePath)
    .then(id => {
      // 获取链接地址
      return getUrl([id])
    })
    .then(res => {
      const music = Object.assign({}, res[0], { name })
      return saveData({ music })
    })
    .then(res => {
      hint('上传成功！')
      return res
    })
    .catch(err => {
      wx.hideLoading()
      console.log(err)
    })
}

module.exports = {
  uploadImg,
  delImg,
  uploadMusic
}
