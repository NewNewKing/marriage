const page = require('../../framework/page.js')
const { getAll } = require('../../services/attend.js')
const { dateFormat } = require('../../lib/util.js')
page({
  data: {
    title: '出席人数',
    list: []
  },
  onLoad() {
    getAll().then(res => {
      this.setData(this.parseData(res))
    })
  },
  parseData(res) {
    console.log(res)
    let num = 0
    const list = res.map(item => {
      const { userInfo, attendInfo, time } = item
      const { attendNum } = attendInfo
      if (attendNum > 3) {
        num += 3
        attendInfo.attendNum = '3人以上'
      } else {
        num += attendNum
        attendInfo.attendNum = attendNum + '人'
      }
      return {
        userInfo,
        time: dateFormat(time, 'yyyy.mm.dd HH:MM:ss'),
        attendInfo
      }
    })
    let title = '出席人数'
    if (num > 0) {
      title+= `至少${num}人`
    }
    return {
      list,
      title
    }
  }
})
