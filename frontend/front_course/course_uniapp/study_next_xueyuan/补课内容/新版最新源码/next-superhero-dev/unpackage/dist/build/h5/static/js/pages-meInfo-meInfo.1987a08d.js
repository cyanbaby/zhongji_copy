(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-meInfo-meInfo"],{"5c20":function(i,t,e){"use strict";e.r(t);var a=e("9ce5"),n=e.n(a);for(var s in a)"default"!==s&&function(i){e.d(t,i,function(){return a[i]})}(s);t["default"]=n.a},"9ce5":function(i,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{globalUser:{}}},onShow:function(){var i=this,t=i.getGlobalUser("globalUser");i.globalUser=t},methods:{modifySex:function(){uni.navigateTo({url:"../sex/sex"})},modifyBirthday:function(){uni.navigateTo({url:"../meBirthday/meBirthday"})},modifyNickname:function(){uni.navigateTo({url:"../meNickname/meNickname"})},operator:function(){var i=this,t=i.getGlobalUser("globalUser");uni.showActionSheet({itemList:["查看我的头像","从相册选择上传"],success:function(i){var e=i.tapIndex;if(0==e){var a=[];a.push(t.faceImage),uni.previewImage({urls:a,current:a[0]})}else 1==e&&uni.chooseImage({count:1,sizeType:["compressed"],sourceType:["album"],success:function(i){var t=i.tempFilePaths[0];uni.navigateTo({url:"../meFace/meFace?tempFilePath="+t})}})}})},cleanStorage:function(){uni.clearStorageSync(),uni.showToast({title:"清理缓存成功",mask:!1,duration:1500})},logout:function(){var i=this.getGlobalUser("globalUser"),t=this.serverUrl;uni.request({url:t+"/user/logout?userId="+i.id,method:"POST",success:function(i){200==i.data.status&&(uni.removeStorageSync("globalUser"),uni.switchTab({url:"../me/me"}))}})}}};t.default=a},da17:function(i,t,e){"use strict";var a=e("f2db"),n=e.n(a);n.a},ed76:function(i,t,e){"use strict";e.r(t);var a=e("f1b7"),n=e("5c20");for(var s in n)"default"!==s&&function(i){e.d(t,i,function(){return n[i]})}(s);e("da17");var o=e("2877"),r=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"57695ca1",null);t["default"]=r.exports},f1b7:function(i,t,e){"use strict";var a=function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("v-uni-view",{staticClass:"page page-fill"},[e("v-uni-view",{staticClass:"page-block info-list"},[e("v-uni-view",{staticClass:"item-wapper face-line-upbottom",on:{click:function(t){t=i.$handleEvent(t),i.operator(t)}}},[e("v-uni-view",{staticClass:"info-words"},[i._v("头像")]),e("v-uni-view",{staticClass:"right-wapper"},[e("v-uni-image",{staticClass:"face",attrs:{src:i.globalUser.faceImage}}),e("v-uni-view",{staticClass:"arrow-block"},[e("v-uni-image",{staticClass:"arrow-ico",attrs:{src:"../../static/icos/left-gray-arrow.png"}})],1)],1)],1),e("v-uni-view",{staticClass:"line-top"},[e("v-uni-view",{staticClass:"line"})],1),e("v-uni-view",{staticClass:"item-wapper",on:{click:function(t){t=i.$handleEvent(t),i.modifyNickname(t)}}},[e("v-uni-view",{staticClass:"info-words"},[i._v("昵称")]),e("v-uni-view",{staticClass:"right-wapper"},[e("v-uni-view",{staticClass:"gray-fields"},[i._v(i._s(i.globalUser.nickname))]),e("v-uni-view",{staticClass:"arrow-block"},[e("v-uni-image",{staticClass:"arrow-ico",attrs:{src:"../../static/icos/left-gray-arrow.png"}})],1)],1)],1),e("v-uni-view",{staticClass:"line-top"},[e("v-uni-view",{staticClass:"line"})],1),e("v-uni-view",{staticClass:"item-wapper",on:{click:function(t){t=i.$handleEvent(t),i.modifyBirthday(t)}}},[e("v-uni-view",{staticClass:"info-words"},[i._v("生日")]),e("v-uni-view",{staticClass:"right-wapper"},[e("v-uni-view",{staticClass:"gray-fields"},[i._v(i._s(i.globalUser.birthday))]),e("v-uni-view",{staticClass:"arrow-block"},[e("v-uni-image",{staticClass:"arrow-ico",attrs:{src:"../../static/icos/left-gray-arrow.png"}})],1)],1)],1),e("v-uni-view",{staticClass:"line-top"},[e("v-uni-view",{staticClass:"line"})],1),e("v-uni-view",{staticClass:"item-wapper",on:{click:function(t){t=i.$handleEvent(t),i.modifySex(t)}}},[e("v-uni-view",{staticClass:"info-words"},[i._v("性别")]),e("v-uni-view",{staticClass:"right-wapper"},[e("v-uni-view",{staticClass:"gray-fields"},[1==i.globalUser.sex?e("v-uni-view",[i._v("男")]):0==i.globalUser.sex?e("v-uni-view",[i._v("女")]):e("v-uni-view",[i._v("未选择")])],1),e("v-uni-view",{staticClass:"arrow-block"},[e("v-uni-image",{staticClass:"arrow-ico",attrs:{src:"../../static/icos/left-gray-arrow.png"}})],1)],1)],1)],1),e("v-uni-view",{staticClass:"footer-wapper"},[e("v-uni-view",{staticClass:"footer-words",on:{click:function(t){t=i.$handleEvent(t),i.cleanStorage(t)}}},[i._v("清理缓存")]),e("v-uni-view",{staticClass:"footer-words",staticStyle:{"margin-top":"10upx"},on:{click:function(t){t=i.$handleEvent(t),i.logout(t)}}},[i._v("退出登录")])],1)],1)},n=[];e.d(t,"a",function(){return a}),e.d(t,"b",function(){return n})},f2db:function(i,t,e){var a=e("f8e0");"string"===typeof a&&(a=[[i.i,a,""]]),a.locals&&(i.exports=a.locals);var n=e("4f06").default;n("3c97cf1b",a,!0,{sourceMap:!1,shadowMode:!1})},f8e0:function(i,t,e){t=i.exports=e("2350")(!1),t.push([i.i,"/* 页面铺满屏幕 */.page-fill[data-v-57695ca1]{width:100%;height:100%;position:absolute}.info-list[data-v-57695ca1]{\r\n\t/* margin-top: 20upx; */padding:%?0?% %?30?%}.info-words[data-v-57695ca1]{color:#333;font-size:16px;width:25%;line-height:%?80?%\r\n\t/* font-weight: bold; */}.face[data-v-57695ca1]{width:%?80?%;height:%?80?%;border-radius:50%}.arrow-block[data-v-57695ca1]{margin-left:%?10?%;line-height:%?86?%}.arrow-ico[data-v-57695ca1]{width:%?30?%;height:%?30?%}.item-wapper[data-v-57695ca1]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;\r\n\t/* margin-top: 20upx; */-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}.face-line-upbottom[data-v-57695ca1]{margin-top:%?20?%;\r\n\t/* margin-bottom: 20upx; */padding-top:%?20?%;padding-bottom:%?20?%}.line-top[data-v-57695ca1]{\r\n\t/* margin-top: 20upx; */}.right-wapper[data-v-57695ca1]{width:80%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.gray-fields[data-v-57695ca1]{font-size:14px;color:#a9a9a9;line-height:%?80?%}\r\n/* 底部操作 start */.footer-wapper[data-v-57695ca1]{position:fixed;bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%}.footer-words[data-v-57695ca1]{text-align:center;background-color:#fff;padding:%?20?%;color:#333;font-size:16px}\r\n/* 底部操作 end */",""])}}]);