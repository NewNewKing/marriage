const cloud = require("wx-server-sdk")
const router = require("./router.js")

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { url, data } = event
  const result = await router[url](data)
  return result
}
