/* eslint-disable */ 

/*
 * @Date: 2021-02-22 13:53:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-28 11:54:38
 * @FilePath: \o-front-admin\src\views\examination\info-user\api.js
 */
import { request } from '@/api/service'
const apiPrefix = '/examservice'

export function EXAM_STUDENT (query) {
  return request({
    url: 'signupservice/examinee/list',
    method: 'post',
    data: query
  })
}
/**
 * 发送消息
 * @returns
 */
export function EXAM_POST_MSG (obj) {
  return request({
    url: '/examservice/interview/insertbatch',
    method: 'post',
    data: obj
  })
}
