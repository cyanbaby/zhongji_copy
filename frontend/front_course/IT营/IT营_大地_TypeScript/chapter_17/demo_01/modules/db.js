"use strict";
exports.__esModule = true;
exports.save = exports.getData = void 0;
var dbUrl = 'xxxxxx';
function getData() {
    console.log('获取数据库的数据111');
    return [
        {
            title: '121312'
        },
        {
            title: '121312'
        }
    ];
}
exports.getData = getData;
function save() {
    console.log('保存数据成功');
}
exports.save = save;
