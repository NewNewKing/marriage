const cloud = require('wx-server-sdk')
const db = cloud.database()
const INFO = db.collection('info')

const getInfo = async () => {
  return await INFO.get()
}

const update = async (_id, data) => {
  return await INFO.doc(_id).update({
    data
  })
}

module.exports = {
  getInfo,
  update
}
