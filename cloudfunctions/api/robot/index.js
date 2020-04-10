/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 王兴欣
 * @Date: 2020-03-27 20:58:11
 * @LastEditors: 王兴欣
 * @LastEditTime: 2020-04-10 10:01:17
 */
const lexicon = require("./lexicon.js")
async function robot({ comment }) {
  
  const result = lexicon.filter(item => item.reg.test(comment))
  if (result && result.length) {
    let code = 2, msg =''
    for(let i = 0; i < result.length; i++) {
      const item = result[i]
      item.reg.lastIndex = 0
      const message = typeof item.reply === 'string' ? item.reply : item.reply()
      if (message) {
        msg = message
        break
      }
    }
    return { code, msg }
  }
  return {}
}

module.exports = robot
