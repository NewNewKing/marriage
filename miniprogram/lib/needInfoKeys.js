const obj = {
  common: ['$ready', '$style', '$_id'],
  // 首页
  ['pages/index/index']: [
    '$groom',
    '$bride',
    '$indexImgs',
    '$indexBanners',
    '$address',
    '$date1',
    '$date2',
    '$time',
    '$indexFlashTexts'
  ],
  // 相册
  ['pages/photo/index']: ['$photos'],
  // 导航
  ['pages/navigator/index']: [
    '$address',
    '$phone1',
    '$phone2',
    '$hotel',
    '$lon',
    '$lat'
  ],
  // 信息设置
  ['pages/setting_info/index']: [
    '$groom',
    '$bride',
    '$phone1',
    '$phone2',
    '$date1',
    '$date2',
    '$time'
  ],
  // 照片上传
  ['pages/setting_photo/index']: ['$photos'],
  // 酒店设置
  ['pages/setting_hotel/index']: ['$lat', '$lon', '$hotel', '$address']
}

module.exports = obj
