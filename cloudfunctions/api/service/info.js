const dao = require('../dao/info.js')
const cloud = require('wx-server-sdk')
const managerService = require('../service/manager.js')
const createCollection = require('../lib/createCollection.js')
const baseInfo = require('../static/marriage.info.js')

const getInfo = async () => {
  const num = await managerService.getCount()

  // 没有管理员代表第一次进入
  if (!num) {
    await createCollection()
    await Promise.all([managerService.add(), dao.add(baseInfo)])
  } else if (num < 2) {
    // 如果只有1个管理员  则添加第二个
    const manager = await managerService.find()
    if (!manager.length) {
      await managerService.add()
    }
  }

  // 正常的获取信息
  const {
    data: [info]
  } = await dao.getInfo()
  const obj = {}
  // 所有字段加上$前缀
  for (let key in info) {
    obj['$' + key] = info[key]
  }
  return obj
}

const setInfo = async (id, data) => {
  const manager = await managerService.find()
  // 不是管理员 不能设置信息
  if (!manager.length) {
    return { code: 1, msg: '您没有权限！' }
  }
  const info = await dao.update(id, data)
  return info
}

module.exports = {
  getInfo,
  setInfo
}
