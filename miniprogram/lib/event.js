const events = {}
const Event = {
  on(name, fn) {
    if (events[name]) {
      events[name].push(fn)
    } else {
      events[name] = [fn]
    }
  },
  off(name) {
    events[name] = []
  },
  emit(name, params) {
    const list = events[name]
    if (list) {
      list.map(fn => fn(params))
    }
  }
}
module.exports = Event
