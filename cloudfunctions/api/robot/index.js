/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 王兴欣
 * @Date: 2020-03-27 20:58:11
 * @LastEditors: 王兴欣
 * @LastEditTime: 2020-04-06 20:58:38
 */
const lexicon = require("./lexicon.js")
async function robot({ comment }) {
  
  const result = lexicon.find(item => item.reg.test(comment))

  if (result) {
    result.reg.lastIndex = 0
    const msg = typeof result.reply === 'string' ? result.reply : result.reply()
    return { code: 2, msg}
  }
  return {}
}

module.exports = robot
