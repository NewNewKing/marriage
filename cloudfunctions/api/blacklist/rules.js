const rules = [
  {
    reg: /嫖娼|大保健|分手|离婚|绿帽子|绿油油|偷情/g,
    type: 1
  },
  {
    reg: /(操|艹|草)你(妈|吗)?/g,
    type: 1
  },
  {
    reg: /金三胖|习近平|奥巴马|毛泽东|江泽民|藏独|台独|中央领导人/g,
    type: 2
  },
  {
    reg: /法轮功/g,
    type: 3
  },
  {
    reg: /鸡吧/g,
    type: 4
  }
]
const msgBox = {
  1: '咱还能不能好好说话了？',
  2: '哎哟~不能评论这些哦~',
  3: '饭可以乱吃，但是话不能乱说！',
  4: '说鸡不说吧，文明你我他'
}

module.exports = {
  rules,
  msgBox
}
