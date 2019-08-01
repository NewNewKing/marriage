const dao = require('../dao/egg.js')

const clue = async (data, OPENID) => {
  // 先查找是否有这条记录
  const result = await dao.doc(OPENID).catch(() => null)
  if (result) return result.data
  // 没有该记录则新增记录
  const count = await dao.getCount().then(res => res.total)
  const params = Object.assign(
    {
      _id: OPENID,
      rank: count + 1,
      del: false,
      time: Date.now(),
      money: 100
    },
    data
  )
  await dao.add(params)
  return params
}

module.exports = {
  clue
}
