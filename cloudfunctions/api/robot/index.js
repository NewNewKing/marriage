const lexicon = require("./lexicon.js")
async function robot({ comment }) {
  const result = lexicon.find(item => item.reg.test(comment))

  if (result) {
    result.reg.lastIndex = 0
    return { code: 2, msg: result.reply }
  }
  return {}
}

module.exports = robot
