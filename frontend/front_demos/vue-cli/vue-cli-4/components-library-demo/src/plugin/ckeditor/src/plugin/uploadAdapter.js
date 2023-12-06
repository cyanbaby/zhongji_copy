// uploadAdapter.js

import qiniuUpload from '../upload';

export default class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
        this.uploader = null;
    }
    // 通过这个方法，会把上传到服务器的文件地址展示到编辑器中
    async upload() {
        const file = await this.loader.file;
        this.uploader = await qiniuUpload(file)
        let serveIp = 'https://gw.universitycloud.cn'
        if (document.domain === 'localhost'
        || document.domain === 'p01.universitycloud.cn' 
        || document.domain === 'o01.universitycloud.cn' 
        || document.domain === 'admin.universitycloud.cn') {
            serveIp = 'http://gwt.universitycloud.'
        }
        return new Promise((resolve, reject) => {
            this.uploader.subscribe(data => {
            }, error => {
                console.error(error)
                return reject(error);
            }, data => {
                console.log(`-----${serveIp + data.key}-----`)
                return resolve({
                    default: serveIp + data.key,
                })
            })
        })
    }
    // 这个方法会在编辑器销毁时候，终止文件上传
    abort() {
        if (this.uploader) {
            this.uploader.unsubscribe();
        }
    }
}

