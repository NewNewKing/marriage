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

module.exports = {
  check
}
