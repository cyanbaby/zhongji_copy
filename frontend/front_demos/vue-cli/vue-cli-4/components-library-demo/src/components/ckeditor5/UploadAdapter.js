/* eslint-disable */

import * as qiniu from 'qiniu-js'

export default class UploadAdapter {
  constructor (loader, vm) {
    this.loader = loader
    this.uploader = null
    this.vm = vm
  }
  
  async upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
            const data = new FormData()
            data.append('upload', file)
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
            this.vm.$api.GETTOKEN({
              ...info
            }).then(res => {
                const data = res.data
                if (data && data.qiniu) {
                  const putExtra = {
                    fname: file,
                    params: {},
                    mimeType: ["image/png", "image/jpeg", "image/gif"]
                  }
                  const config = {
                    region: '',
                    chunkSize: 10,
                    forceDirect: false
                  }
                  const observable = qiniu.upload(
                    file,
                    data.qiniu.key,
                    data.qiniu.token,
                    putExtra,
                    config
                  )
                  const observer = {
                    next: response => {},
                    error: err => {
                      alert(err.message)
                    },
                    complete: response => {
                      if (response.code === '1') {
                        loader.uploaded = true
                        // 最终返回的对象格式：{default: imgUrl}
                        resolve({ default: response.data })
                      }
                    }
                  }
                  observable.subscribe(observer) // 上传开始
                }
            })
            .catch(err => {
                reject(err)
            })
        })
    )
  }

  abort () {
    if(this.uploader) {
      this.uploader.unsubscribe()
    }
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
