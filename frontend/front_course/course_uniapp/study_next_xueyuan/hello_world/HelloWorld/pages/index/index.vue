<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view>
			<navigator :url="'/pages/hello/hello'">跳转hello页</navigator>
		</view>
		<view style="width:300px; height: 300px; background-color: royalblue;">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		/**
		 * @description 页面加载事件
		 * 未重新加载页面情况下只会执行一次
		 * 监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），
		 * 参考示例https://uniapp.dcloud.net.cn/api/router.html#navigateto
		 * @param {object} option - 传入的对象参数
		 * uni.navigateTo({
		 * 	url: 'test?id=1&name=uniapp'
		 * });
		 */
		onLoad(option) {
			console.log(option.id); //打印出上个页面传递的参数。
			console.log(option.name); //打印出上个页面传递的参数。
		},
		/**
		 * @description 页面卸载事件
		 * 注意：导航页之间的切换不会触发onUnload()
		 * 参考: https://blog.csdn.net/zssafsa/article/details/125498043
		 * hello页演示
		 */
		onUnload() {
			console.log('index页 监听页面卸载')
		},
		/**
		 * @description 页面显示事件
		 * 导航页之间的切换就会触发
		 */
		onShow() {
			console.log('index页 监听页面显示')
		},
		/**
		 * @description 页面隐藏事件
		 * 导航页之间的切换就会触发
		 */
		onHide() {
			console.log('index页 监听页面隐藏')
		},
		/**
		 * @description 页面初次渲染完成事件
		 */
		onReady() {
			console.log('index页 页面初次渲染完成事件')
		},
		/**
		 * @description 下拉刷新事件
		 */
		onPullDownRefresh() {
			
		},
		/**
		 * @description 上传触底事件
		 */
		onReachBottom() {
			
		},
		/**
		 * @description 点击右上角分享
		 * 仅微信小程序中使用
		 */
		onShareAppMessage() {
			console.log('index页 点击右上角分享')
		},
		/**
		 * @description 页面滚动事件
		 */
		onPageScroll() {
			console.log('index页 页面滚动事件')
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
