const infoKeys = require("./needInfoKeys.js")
function sleep(ms, params) {
  ms = ms | 0
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(params)
    }, ms)
  })
}

function dateFormat(value, format) {
  const dateFlag = {
    yyyy: function(date) {
      return date.getFullYear()
    },
    mm: function(date) {
      return pad(date.getMonth() + 1)
    },
    dd: function(date) {
      return pad(date.getDate())
    },
    HH: function(date) {
      return pad(date.getHours())
    },
    MM: function(date) {
      return pad(date.getMinutes())
    },
    ss: function(date) {
      return pad(date.getSeconds())
    },
    C: function(date) {
      return ["日", "一", "二", "三", "四", "五", "六", "日"][date.getDay()]
    }
  }

  const dateToken = /d{1,4}|m{1,4}|yy(?:yy)?|HH|MM|ss|C/g

  function pad(val, len) {
    val = val + ""
    len = len || 2
    while (val.length < len) {
      val = "0" + val
    }
    return val
  }

  value = new Date(value)

  return format.replace(dateToken, function(match) {
    const callback = dateFlag[match]

    if (callback) {
      return callback(value)
    }

    return match
  })
}

function showToast(data) {
  const options = Object.assign(
    {
      icon: "none",
      duration: 3000
    },
    data
  )
  wx.showToast(options)
}

function unique(...arg) {
  const list = arg.reduce((list, current) => {
    return list.concat(current)
  }, [])
  return [...new Set(list)]
}

function stage(data, page) {
  console.log(data)
  if (typeof data === "number") {
    return sleep(data * 1000)
  } else {
    const { inTime, outTime, duration } = data
    page.setData({
      $flashStatus: "in"
    })
    return sleep(inTime * 1000)
      .then(() => {
        page.setData({
          $flashStatus: "duration"
        })
        return sleep(duration * 1000)
      })
      .then(() => {
        page.setData({
          $flashStatus: "out"
        })
        return sleep(outTime * 1000)
      })
  }
}

// [{in: 0, out: 0, duration: 1}] || [4, 5]
function flow(list, page) {
  let fps = 0
  page.setData({ stage: fps })
  const len = list.length
  let resolve = Promise.resolve()
  for (let i = 0; i < len; i++) {
    resolve = resolve.then(() => {
      console.log("开始stage-" + fps)
      return stage(list[i], page).then(() => {
        ++fps
        page.setData({ stage: fps })
        if (len === i + 1) {
          console.log("最后一幕开始stage-" + fps)
        }
      })
    })
  }
  return resolve
}

function pick(obj, keys) {
  const data = {}
  keys.map(item => {
    if (obj[item] !== undefined) {
      data[item] = obj[item]
    }
  })

  return data
}

function getNeedInfo(info, page) {
  const { common } = infoKeys
  const list = infoKeys[page.route]
  return pick(info, [...list, ...common])
}

function getFlashTime(list, flag) {
  let time = 0
  const times = list.map(item => {
    const { inTime, outTime, duration } = item
    time += item.duration + inTime + outTime
    return {
      duration,
      inTime,
      outTime
    }
  })
  // 真机可能有误差 + 1s
  if (flag) return time + 1
  return times
}
module.exports = {
  sleep,
  dateFormat,
  showToast,
  unique,
  flow,
  pick,
  getNeedInfo,
  getFlashTime
}
