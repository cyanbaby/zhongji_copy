/*
 * @Date: 2021-02-22 13:53:37
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-06-07 12:46:32
 * @FilePath: \组织\src\views\join\user\api.js
 */
import { request } from '@/api/service'

const apiService = '/signupservice'
/**
 * 查询报考人员
 * @param {String} activityId  id
 * @returns
 */
export function GetList (query) {
  return request({
    url: apiService + '/userenterrecord/pageuserenterrecord',
    method: 'get',
    params: query
  })
}
/**
 * 查询报考人员（考务报名）
 * @param {String} activityId  id
 * @returns
 */
export function GetListKao (query) {
  return request({
    url: apiService + '/signup/audit/list',
    method: 'get',
    params: query
  })
}
/**
    * 查询下一条用户报名信息
   */
export function QUERY_THE_NEXT (query) {
  return request({
    url: apiService + '/signup/audit/querynextuser',
    method: 'get',
    params: query
  })
}
/**
 * 查询报考人员（高师）
 * @param {String} activityId  id
 * @returns
 */
export function GetListGao (query) {
  return request({
    url: apiService + '/user/class/pageuserenterrecord',
    method: 'post',
    data: query
  })
}
/**
    * 查询常用语列表
   */
export function COMMON_EXPRESSIONS_LIST (query) {
  return request({
    url: apiService + '/audit/common/list',
    method: 'get',
    params: query
  })
}
/**
 * 审核报考人员
 * @returns
 */
export function AUDIT_STUDENT (obj) {
  return request({
    url: apiService + '/signup/audit/audit',
    method: 'post',
    data: obj
  })
}
/**
 * 审核岗位信息
 * @returns
 */
export function QUERY_JOB_INFORMATION (query) {
  return request({
    url: apiService + '/signup/position/get',
    method: 'get',
    params: query
  })
}

/**
 * 报名人员详情
 * @param {String} recordId  当前报名记录id
 * @param {String} userName  userName 用户姓名 排序
 * @param {String} idCardNum  idCardNum 身份证号 排序
 * @param {String} positionId  岗位id 排序
 * @returns
 */
export function GetObj (query) {
  return request({
    url: apiService + '/userenterrecord/getuserenterrecordbyid',
    method: 'get',
    params: query
  })
}
/* 报名人员详情 （考务报名-上一个） */
export function GetObjKao (query) {
  return request({
    url: apiService + '/signup/audit/queryuser',
    method: 'get',
    params: query
  })
}

/* 查询审核用户列表（考务报名-下一个） */
export function GetObjKaoList (query) {
  return request({
    url: apiService + '/signup/audit/querynextuserbase',
    method: 'post',
    data: query
  })
}
/**
 * 导出报考人员
 * @returns
 */
export function ExportApplicationClass (obj) {
  return request({
    url: apiService + '/user/class/exportuserenterrecord',
    method: 'post',
    data: obj
  })
}
