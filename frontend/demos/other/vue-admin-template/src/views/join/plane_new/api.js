/*
 * @Date: 2021-02-22 13:53:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-18 09:39:01
 * @FilePath: \组织\src\views\join\plane\api.js
 */
import { request } from '@/api/service'

const apiService = '/signupservice'

/**
 * @description 更新岗位信息
 */
export function UPDATE_WORK (data) {
  return request({
    url: apiService + '/activity/update/position',
    method: 'put',
    data
  })
}
/**
 * @description 更新岗位信息
 */
export function DEL_WORK (query) {
  return request({
    url: apiService + '/position/delete',
    method: 'delete',
    params: query
  })
}
/**
 * @description 查询岗位信息
 */
export function GET_WORK_INFO (query) {
  return request({
    url: apiService + '/position/get',
    method: 'get',
    params: query
  })
}

/**
 * @description 查询活动下岗位
 */
export function GetWork (query) {
  return request({
    url: apiService + '/signup/position/list',
    method: 'get',
    params: query
  })
}

/**
 * @description 新建/编辑岗位
 */
export function SAVE_WORK (data) {
  return request({
    url: apiService + '/position/save',
    method: 'post',
    data
  })
}

/**
 * @description 查询学历
 */
export function GetDegree (query) {
  return request({
    url: '/baseservice/dictdata/list?typeCode=degree_type',
    method: 'get',
    params: query
  })
}

/**
 * @description 查询各学历对应专业
 */
export function GetMajor (query) {
  return request({
    url: apiService + '/profession/list',
    method: 'get',
    params: query
  })
}

/**
 * @description 查询公告
 */
export function GetGG (query) {
  return request({
    url: apiService + '/announcement/get',
    method: 'get',
    params: query
  })
}
/**
 * @description 新增/保存公告
 */
export function ADD_GG (data) {
  return request({
    url: apiService + '/announcement/save',
    method: 'post',
    data
  })
}

export function GetList (query) {
  return request({
    url: apiService + '/signup/activity/list',
    method: 'get',
    params: query
  })
}

/**
 * @description 查询活动基本信息
 * @param {String} activityId  id
 * @returns
 */
export function GetBase (query) {
  return request({
    url: apiService + '/activity/baseinfo',
    method: 'get',
    params: query
  })
}
/**
 * @description 保存基本信息
 */
export function SAVE_BASE (data) {
  return request({
    url: apiService + '/activity/savebaseinfo',
    method: 'post',
    data
  })
}

/**
 * @description 查询活动详情
 * @param {String} activityId  id
 * @returns
 */
export function GetObj (query) {
  return request({
    url: apiService + '/activity/queryactivityinfo',
    method: 'get',
    params: query
  })
}

/**
 * @description 查询招考单位
 */
export function GET_UNIT (query) {
  return request({
    url: apiService + '/organization/listorganization',
    method: 'get',
    params: query
  })
}

/**
 * @description 保存报名活动招考单位信息
 */
export function SAVE_UNIT (data) {
  return request({
    url: apiService + '/activity/saveactivityorginfo',
    method: 'post',
    data
  })
}

/**
 * 删除报名活动招考单位信息
 * @param {String} activityId  id
 * @returns
 */
export function DEL_UNIT (query) {
  return request({
    url: apiService + '/activity/deleteactivityorginfo',
    method: 'delete',
    params: query
  })
}

/**
 * 查询报名表列表
 * @param {String} activityId  id
 * @returns
 */
export function GET_TEMP (query) {
  return request({
    url: apiService + '/entertemplate/listentertemplate',
    method: 'get',
    params: query
  })
}

/**
 * @description 保存招考活动报名表
 */
export function SAVE_TEMP (data) {
  return request({
    url: apiService + '/activity/saveactivitytemplateinfo',
    method: 'post',
    data
  })
}

/**
 * 删除招考活动报名表
 * @param {String} activityId  id
 * @returns
 */
export function DEL_TEMP (query) {
  return request({
    url: apiService + '/activity/deleteactivitytemplateinfo',
    method: 'delete',
    params: query
  })
}

/**
 * 下载报名表
 */
export function GET_WORK_DOWNLOAD (data) {
  return request({
    url: apiService + '/material/export/position/enterformfile',
    method: 'post',
    data
  })
}
