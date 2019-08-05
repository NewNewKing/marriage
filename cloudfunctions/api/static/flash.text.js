/*
* 除了text外 都可缺省
* 展示属性值都是默认值
* 动画名 只支持animate.css 里面的动画名
* 总共持续时间 = duration + inTime + outTime
* {
*   text: '大家好',
*   direction: 'horizontal', horizontal(水平)|vertical(竖直)
*   fontSize: 60,            字体大小
*   duration: 0.25,          字存在时间 默认0.25
*   inName: '',              进入动画名
*   inTime: '',              进入时间 默认 0.3
*   outNmae: '',             退出动画名
*   outTime: ''              退出时间 默认 0.3
*   double: false            是否双重影像 只在out时间有效
*   
* }
*/
const texts = [
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
    text: '小姐姐'
  },
  {
    text: '告诉你们'
  },
  {
    text: '一个'
  },
  {
    inTime: 0.5,
    inName: 'jackInTheBox',
    text: '好消息',
    duration: 0.1,
    fontSize: 80
  },
  {
    text: '我们'
  },
  {
    text: '要结婚啦',
    fontSize: 40
  },
  {
    text: '要结婚啦',
    fontSize: 60
  },
  {
    text: '要结婚啦',
    fontSize: 80
  },
  {
    text: '要结婚啦',
    direction: 'vertical',
    fontSize: 80
  },
  {
    text: '要结婚啦',
    fontSize: 80
  },
  {
    text: '要结婚啦',
    double: true,
    outName: 'growOut',
    fontSize: 80,
    inName: 'puffIn',
    duration: 0.1
  },
  {
    text: '诚邀',
    inName: 'flash'
  },
  {
    text: '诚邀您'
  },
  {
    text: '您',
    fontSize: 80,
    outName: 'growOut'
  },
  {
    inName: 'fadeIn',
    text: '携家人'
  },
  {
    text: '出席'
  },
  {
    text: '我们的婚礼',
    outName: 'growOut'
  },
  {
    inName: 'puffIn',
    text: '一起见证',
    duration: 0.2
  },
  {
    inName: 'zoomIn',
    text: '我们的',
    duration: 0.2,
    outName: 'growOut'
  },
  {
    inName: 'rotateIn',
    outName: 'rotateOut',
    text: '幸福',
    duration: 0.2
  },
  {
    text: '幸福',
    fontSize: 80,
    inName: 'zoomIn',
    outName: 'growOut',
    duration: 0.2
  }
]

function fillFlashOptions(list) {
  const ANIMATETIME = 0.3
  const DURATIONTIME = 0.4
  const FONTSIZE = 60
  const DIRECTION = 'horizontal'
  return list.map(item => {
    let {
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
      double: !!double
    }
  })
}
module.exports = fillFlashOptions(texts)
