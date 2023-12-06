/* eslint-disable */
// uploadAdapter.js

import qiniuUpload from './upload';

export default class UploadAdapter {
    constructor(loader, vm) {
        this.loader = loader;
        this.uploader = null;
        this.vm = vm
    }
    // 通过这个方法，会把上传到服务器的文件地址展示到编辑器中
    async upload() {
        const file = await this.loader.file;
        this.uploader = await qiniuUpload(file, this.vm)
        return new Promise((resolve, reject) => {
            const observer = {
                next: response => {},
                error: err => {
                    alert(err.message)
                },
                complete: response => {
                    if (response.code === '1') {
                        this.loader.uploaded = true
                        // 最终返回的对象格式：{default: imgUrl}
                        resolve({ default: response.data })
                    }
                }
            }
            this.uploader.subscribe(observer) // 上传开始
        })
    }
    // 这个方法会在编辑器销毁时候，终止文件上传
    abort() {
        if (this.uploader) {
            this.uploader.unsubscribe();
        }
    }
}

