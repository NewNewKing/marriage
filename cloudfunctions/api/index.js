const cloud = require("wx-server-sdk")
const router = require("./router/index.js")

cloud.init()
/*
*
* @reutrn {}
* code  0、成功 1、失败 2、成功并且展示msg
* msg   请求消息
* data  返回数据
*/

// 云函数入口函数
exports.main = async (event, context, a) => {
  console.log(event)
  const { url, data } = event
  const path = url.split(".")
  const result = await router[path[0]][path[1]](data)
  if (!result.msg) {
    result.msg = "suceess!"
  }
  if (!result.code) {
    result.code = 0
  }
  if (!result.data) {
    result.data = null
  }
  return result
}
