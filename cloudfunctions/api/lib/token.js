const axios = require('axios')

let token = '', expires = 0, now = 0

// 获取token
async function getTokenFromApi () {
  return axios.get('https://api.weixin.qq.com/cgi-bin/token', {
    params: {
      grant_type: 'client_credential',
      appid: 'wx07bf93be7d34ec7d',
      secret: ''
    }
  }).then(res => {
    if (res.data && res.data.access_token) {
      token = res.data.access_token
      expires = res.data.expires_in
      now = Date.now()
    }else {
      return Promise.reject()
    }
  })
}
async function getToken () {
  // 过期
  if (!token || Date.now() >= now + expires * 1000 - 5 * 60 * 1000) {
    await getTokenFromApi()
  }
  return token
} 

module.exports = {
  getToken
}

