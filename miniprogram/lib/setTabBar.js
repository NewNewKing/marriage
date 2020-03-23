const map = [
  {
    text: '邀请函',
    pagePath: 'pages/index/index'
  },
  {
    text: '相册',
    pagePath: 'pages/photo/index'
  },
  {
    text: '酒店导航',
    pagePath: 'pages/navigator/index'
  },
  {
    text: '留言评论',
    pagePath: 'pages/comment/index'
  }
]
const color = {
  'black-gold': {
    color: '#fff',
    selectedColor: '#eccb90',
    backgroundColor: '#242424'
  }
}
function setTabBar(style) {
  style = style.replace('$', '')
  if (!color[style]) return

  wx.setTabBarStyle(color[style])
  wx.hideTabBar()
  map.map((item, index) => {
    const bar = Object.assign(
      {
        index,
        iconPath: `/images/${style}/icon${index + 1}-1.png`,
        selectedIconPath: `/images/${style}/icon${index + 1}-2.png`
      },
      item
    )
    wx.setTabBarItem(bar)
  })

  wx.showTabBar()
}

module.exports = setTabBar
