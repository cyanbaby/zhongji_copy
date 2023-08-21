<template>
  <view class="page">
    <swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="carousel in carouselList" :key=index>
				<image :src="carousel.image" class="carousel"></image>
			</swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        serverUrl: 'http://rap2api.taobao.org/app/mock/307171',
        carouselList: []
      }
    },
    onLoad() {
      // 轮播图
      uni.request({
        url: this.serverUrl + '/index/carousel/list',
        success: (res) => {
          if (res.data.status == 200) {
            this.carouselList = res.data.data
          }
        }
      });

    },
    methods: {

    }
  }
</script>

<style>
  @import url('index.css');
</style>
