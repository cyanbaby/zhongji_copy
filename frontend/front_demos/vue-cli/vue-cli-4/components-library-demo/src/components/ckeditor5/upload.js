// upload.js

import * as qiniu from 'qiniu-js';

const cache = {};
const formData = new FormData()

// 从服务器获取token
async function getUploadToken(file, vm) {
    try {
        // if (cache.qiniu_token) {
        //     return cache.qiniu_token
        // }
        formData.append('upload', file)
        const fileSize = file.size
        const fileName = file.name
        const info = {
            uploadCode: 'CKEditor-UploadImageFile',
            fileSize,
            fileName,
            fileType: 'img',
            subDirName: getSubDirNameBySuffix(fileName.substring(fileName.lastIndexOf('.'))),
            dictTypeCode: 'material'
        }
        const data = await vm.prototype.$api.GETTOKEN({
            ...info
          }).then(res => {
                const qiniuData = res.data.qiniu
                return qiniuData
          })
          .catch(() => {
                Promise.reject()
          })
        cache.qiniu_token = data.token
        return data
    } catch (error) {
        return Promise.reject();
    }
}

function getSubDirNameBySuffix (suffix) { //通过后缀决定放哪个文件夹
    const suffixToDirName= {
          '.jpg': 'pics',
          '.png': 'pics',
          '.ico': 'pics',
          '.gif': 'pics',
          '.bmp': 'pics',
          '.mp4': 'videos',
          '.mpeg': 'videos',
          '.avi': 'videos',
          '.wmv': 'videos',
          '.doc': 'files',
          '.docx': 'files',
          '.xls': 'files',
          '.xlsx': 'files'
        }
    if (suffix) {
      const name = suffixToDirName[suffix]
      if (name) {
        return name
      }
    }
    return 'files'
  }


// 上传文件到七牛
export default async function upload(file, vm) {
    // 用时间戳作为文件名
    const time = new Date().getTime();
    const data = await getUploadToken(file, vm);
    if (data) {
        const putExtra = {
        fname: time,
        params: {},
        mimeType: ["image/png", "image/jpeg", "image/gif"]
        }
        const config = {
            region: '',
            chunkSize: 10,
            forceDirect: false
        }
        return qiniu.upload(
            file,
            data.key,
            data.token,
            putExtra,
            config
        )
    }
}
