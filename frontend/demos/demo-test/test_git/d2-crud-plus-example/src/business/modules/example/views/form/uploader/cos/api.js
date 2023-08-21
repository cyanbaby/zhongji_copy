import request from '@/business/api/request.mock'
export function GetList (query) {
  return request({
    url: '/upload/cos/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/upload/cos/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/upload/cos/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/upload/cos/delete',
    method: 'post',
    data: { id }
  })
}
