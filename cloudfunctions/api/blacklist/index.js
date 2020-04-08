const axios = require('axios')
const { rules, msgBox } = require("./rules.js")

const check = async data => {
  const { comment } = data
  const result = rules.find(rule =>
    rule.reg.test(comment.replace(/[^\u4e00-\u9fa5]/g, ""))
  )
  if (result) {
    result.reg.lastIndex = 0
    return { code: 1, msg: msgBox[result.type] + " 评论提交失败" }
  }
  return { code: 0 }
}

async function checkFromApi (token, content) {
  return axios.post(`https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`, {
    content
  }).then(res => {
    const { errcode, errmsg } = res.data
    if (errcode === 87014) {
      return { code: 1, msg: '大喜日子不要搞这些😡😡😡！！！\n内容包含敏感信息！！！'}
    }
    return { code: 0 }
  })
}

module.exports = {
  check,
  checkFromApi
}
