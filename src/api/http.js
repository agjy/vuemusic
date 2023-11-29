import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://192.168.1.2:3000'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://47.113.200.34:3000'
}

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencodedcharset=UTF-8'

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export const ERR_OK = 200
