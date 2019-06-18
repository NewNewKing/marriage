const service = require("../service/comment.js")
const { check } = require("../blacklist/index.js")
const robot = require("../robot/index.js")

// data: { name: 'XXX', comment: 'xxxx'}
const add = async data => {
  // 检查评论是否符合要求
  {
    const { code, msg } = await check(data)
    if (code !== 0) {
      return { code, msg }
    }
  }
  data.time = Date.now()
  await service.add(data)
  // 对于某些言论 进行回复 （界面以弹窗形式展示）
  const { code, msg } = await robot(data)
  return { data, code, msg }
}

const getList = async data => {
  const { pageSize = 10, pageNum = 1 } = data

  const result = await service.getList({
    pageSize,
    pageNum
  })
  if (!result.length) {
    return { data: result, code: 2, msg: "没有更多啦~~😝" }
  }
  return { data: result }
}
const getAllList = async () => {
  const result = await service.getAllList()
  return { data: result }
}

module.exports = {
  add,
  getList,
  getAllList
}
