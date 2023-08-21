<script>
	// TODO
	/*
	生命周期执行顺序，应用，页面，组件
	页面同学，组件通信
	网络请求
	样式单位
	UI框架
	*/
		
	// 更多API: https://uniapp.dcloud.net.cn/api

	// 只能在App.vue里监听应用的生命周期
	// https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle#app
	export default {
		onLaunch: function() {
			console.log('App Launch， 当uni-app 初始化完成时触发（全局只触发一次）')
		},
		onShow: function() {
			console.log('App Show, 当 uni-app 启动，或从后台进入前台显示')
		},
		onHide: function() {
			console.log('App Hide， 当 uni-app 从前台进入后台')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
