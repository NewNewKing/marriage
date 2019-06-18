function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
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

module.exports = {
  sleep,
  dateFormat,
  showToast,
  unique
}
