/*
* 除了text外 都可缺省
* 展示属性值都是默认值
* 动画名 只支持animate.css 里面的动画名
* 总共持续时间 = duration + inTime + outTime
* {
*   url:   0                 数字为在相册中的位置 从0开始 与text互斥
*   text: '大家好',           与url互斥  url优先级高
*   direction: 'horizontal', horizontal(水平)|vertical(竖直)
*   fontSize: 60,            字体大小
*   duration: 0.25,          字存在时间 默认0.25
*   inName: '',              进入动画名
*   inTime: '',              进入时间 默认 0.3
*   outNmae: '',             退出动画名
*   outTime: ''              退出时间 默认 0.3
*   double: false            是否双重影像 只在out时间有效
*   live:  1                 存活时间
* }
*/
const texts = [
  {
    url: 0,
    inName: 'halfFadeInDown',
    inTime: 1,
    live: 1,
    duration: 0
  },
  {
    url: 1,
    inName: 'puffIn',
    inTime: 3
  },
  {
    text: '各位',
    inName: 'zoomIn',
    inTime: 0.2,
    outName: 'growOut',
    outTime: 0.2
  },
  {
    text: '长辈们'
  },
  {
    text: '小哥哥'
  },
  {
    text: '小姐姐',
    outName: 'fadeOut'
  },
  {
    text: '!',
    fontSize: 200,
    inName: 'bounce',
    duration: 0.6,
    outName: 'fadeOut'
  },
  {
    text: '我们',
    // direction: 'vertical',
    fontSize: 100,
    inName: 'lightSpeedIn',
    inTime: 0.8,
    outName: "lightSpeedOut",
    outTime: 0.8
  },
  {
    url: 2,
    inName: 'fadeInRight',
    inTime: 3,
    duration: 0,
    live: 1
  },
  {
    url: 3,
    inName: 'zoomIn2',
    inTime: 3,
    duration: 2
  },
  {
    text: '我们',
    fontSize: 40,
    inName: 'lightSpeedIn',
    inTime: 0.8
  },
  {
    text: '要',
    fontSize: 40
  },
  {
    text: '要',
    fontSize: 60
  },
  {
    text: '要',
    fontSize: 80
  },
  {
    text: '要',
    fontSize: 100
  },
  {
    text: '结婚',
    fontSize: 60
  },
  {
    text: '啦',
    fontSize: 60
  },
  {
    text: '结婚啦',
    fontSize: 80,
    inName: 'tada',
    inTime: 0.6
  },
  {
    text: '结婚啦',
    fontSize: 80,
    inName: 'tada',
    inTime: 0.6
  },
  {
    text: '结婚啦',
    fontSize: 80,
    inName: 'tada',
    inTime: 0.6,
    outName: 'flipOutY',
    outTime: 1.2
  },
  {
    inName: 'flipInY',
    inTime: 1,
    text: '最美的',
    duration: 0.5,
    outName: 'flipOutY',
    outTime: 1
  },
  {
    inName: 'flipInY',
    inTime: 1,
    text: '时光',
    duration: 0.5,
    outName: 'flipOutY',
    outTime: 1
  },
  {
    text: '愿',
    inName: 'flipInY',
    inTime: 1,
    fontSize: 100,
    duration: 0.5,
    outName: 'flipOutY',
    outTime: 1
  },
  {
    inName: 'flipInY',
    inTime: 1,
    outName: 'flipOutY',
    duration: 0.5,
    outTime: 1,
    text: '有你们的'
  },
  {
    inName: 'zoomIn',
    inTime: 1,
    duration: 0.8,
    outName: 'growOut',
    fontSize: 140,
    outTime: 1.8,
    text: '祝福',
    direction: 'vertical'
  }
  // {
  //   text: '很期待'
  // },
  // {
  //   text: '您的'
  // },
  // {
  //   text: '很希望\n您参加',
  //   inName: 'pulse',
  //   inTime: 0.5
  // },
  // {
  //   text: '很希望\n您参加',
  //   inName: 'pulse',
  //   inTime: 0.5
  // },
  // {
  //   text: '很希望\n您参加',
  //   inName: 'pulse',
  //   inTime: 0.5,
  //   outName: "fadeOut"
  // }
]

function fillFlashOptions(list) {
  const ANIMATETIME = 0.3
  const DURATIONTIME = 0.4
  const FONTSIZE = 60
  const DIRECTION = 'horizontal'
  return list.map(item => {
    let {
      live,
      url,
      text,
      direction,
      fontSize,
      duration,
      animate,
      inName,
      inTime,
      outName,
      outTime,
      double
    } = item
    if (!live) {
      live = 0
    }
    if (!inName && !outName) {
      inTime = 0
      outTime = 0
    }
    if (inName) {
      inTime = inTime || ANIMATETIME
    } else {
      inTime = 0
    }
    if (outName) {
      outTime = outTime || ANIMATETIME
    } else {
      outTime = 0
    }
    return {
      text,
      direction: direction || DIRECTION,
      fontSize: fontSize || FONTSIZE,
      animate: animate || '',
      inName: inName || '',
      outName: outName || '',
      inTime: inTime,
      outTime: outTime,
      duration: duration || DURATIONTIME,
      double: !!double,
      live,
      url
    }
  })
}
module.exports = fillFlashOptions(texts)
