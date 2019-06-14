const { showHeart } = require("./util.js")
const mixin = require("./mixin.js")

const lifecycle = ["onLoad", "onShareAppMessage-1"]

const page = function(options) {
  mixinData(options, mixin)
  mixinMethods(options, mixin)
  mixinLifeCycle(options, mixin)
  Page(options)
}

function mixinData(options, mixin) {
  const { data = {} } = options
  Object.assign(data, mixin.data)
}

function mixinMethods(options, mixin) {
  const { methods } = mixin
  Object.assign(options, methods)
}

function mixinLifeCycle(options, mixin) {
  lifecycle.map(name => {
    let execOnce = false
    const match = name.match(/^([A-z]+)-1$/)
    if (match) {
      name = match[1]
      execOnce = true
    }
    const fn1 = options[name]
    const fn2 = mixin[name]
    if (!fn1 && !fn2) {
      return
    }

    options[name] = function() {
      let result
      if (execOnce && fn1 && fn2) {
        return fn1.call(this)
      }
      fn2 && (result = fn2.call(this))
      fn1 && (result = fn1.call(this))
      return result
    }
  })
}

module.exports = page
