import request from '@/utils/request'

// 获取用户列表(elementUI table list)
export function getCity(params) {
  return request({
    url: 'https://static.peixunyun.cn/plugins/address.json?timestamp=1673489752032&functionId=5011120062',
    method: 'get',
    params
  })
}
