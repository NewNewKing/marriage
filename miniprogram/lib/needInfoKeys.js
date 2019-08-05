const obj = {
  common: ['$ready', '$style'],
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
    '$markers',
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
    '$time',
    '$_id'
  ]
}

module.exports = obj
