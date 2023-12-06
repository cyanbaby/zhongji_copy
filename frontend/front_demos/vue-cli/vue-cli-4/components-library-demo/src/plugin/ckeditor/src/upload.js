// upload.js

import axios from 'axios';
import * as qiniu from 'qiniu-js';

const cache = {};

// 从服务器获取token
async function getUploadToken() {
    try {
        if (cache.qiniu_token) {
            return cache.qiniu_token
        }
        const { data } = await axios.get('/qiniu_token')
        cache.qiniu_token = data.token
        return data.token
    } catch (error) {
        return Promise.reject(error);
    }
}

// 上传文件到七牛
export default async function upload(file) {
    // 用时间戳作为文件名
    const time = new Date().getTime();
    const token = await getUploadToken();
    return qiniu.upload(file, time, token, {
        fname: time
    })
}
