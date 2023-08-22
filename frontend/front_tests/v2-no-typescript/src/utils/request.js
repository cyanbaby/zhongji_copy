import axios from 'axios'

const service = axios.create({
  baseURL: 'https://www.fastmock.site/mock/0737c57936891ced93b6f8705eb42833/v2-no-typescript', // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(

  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
