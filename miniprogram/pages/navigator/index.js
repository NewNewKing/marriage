const { lon, lat, name, address, phone1, phone2, bridegroom, bride } = require('../../marriage.info.js')
const app = getApp()

Page({
  data: {
    style: app.globalData.style,
    lon,
    lat,
    name,
    address,
    markers: [{
      id: 1,
      latitude: lat,
      longitude: lon,
      iconPath: '/images/nav.png',
      width: 50,
      height: 50
    }]  
  },
  onReady(){
    console.log(this)
    console.log(app)
  },
  markertap(){
    wx.openLocation({
      latitude: lat,
      longitude: lon,
      name,
      address
    })
  },
  makecall({ currentTarget: {dataset:{ sex }}}){
    let number, name = '新人'
    switch(sex) {
      case 'male': 
        number = phone1
        name = '新郎'
      break
      case 'female':
        number = phone2
        name = '新娘'
      break
    }
    console.log(number)
    if (number) {
      wx.makePhoneCall({
        phoneNumber: number + ''
      })
      return 
    }

    wx.showToast({
      title: `${name}暂时没有填入手机号`,
      icon: 'none'
    })
  },
  onShareAppMessage(){
    return {
      title: `快来参加${bridegroom}和${bride}的婚礼吧！`
    }
  }
})
