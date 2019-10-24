const cloud = require('wx-server-sdk')
const db = cloud.database()

const collections = ['info', 'manager', 'egg', 'comment', 'attend']
async function createCollection() {
  await Promise.all(
    collections.map(async item => {
      return await db.createCollection(item)
    })
  )
}

module.exports = createCollection
