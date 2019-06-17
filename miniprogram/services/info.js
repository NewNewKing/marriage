const { api } = require("./request.js")

// 获取小程序所需配置信息
const get = () => api("info.get")

module.exports = {
  get
}
