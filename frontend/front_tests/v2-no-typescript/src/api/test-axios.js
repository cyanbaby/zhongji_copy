import request from '@/utils/request'

// 获取用户列表(elementUI table list)
export function getUserList(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

// 获取权值
export function getPermission(params) {
  return request({
    url: '/permission',
    method: 'get',
    params
  })
}
