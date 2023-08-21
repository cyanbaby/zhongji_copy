/*
 * @Author: 姚文彬
 * @Date: 2021-05-26 22:24:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-28 11:55:41
 * @FilePath: \o-front-admin\src\views\examination\msgInfo\api.js
 */
/*
 * @Date: 2021-02-22 13:53:37
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-05-26 22:14:42
 * @FilePath: \o-front-admin\src\views\examination\info-user\api.js
 */
import { request } from '@/api/service'
const apiPrefix = '/examservice'

export function GetList (query) {
  return request({
    url: apiPrefix + '/interview/getnoticerecord',
    method: 'get',
    params: query
  })
}
