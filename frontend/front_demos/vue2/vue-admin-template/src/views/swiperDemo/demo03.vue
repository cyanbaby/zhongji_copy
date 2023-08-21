<template>
  <div class="recommendPage">
    <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
      <swiper-slide style="margin-right: 0px;" v-for="(items,indexs) in listImg" :key="indexs" class="content-box">
        <img :src="items.url" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        // speed: 5000, // 匀速时间
        speed: 5000, // 匀速时间

        freeMode: true,
        loop: true,
        autoplay: {
          delay: 0,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // slidesPerView: 3,
        slidesPerView: 1,
        loopFillGroupWithBlank: true,
        normalizeSlideIndex: true
      },
      listImg: [
        { url: 'https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xhyidxj31hc0u0x6p.jpg' },
        { url: 'https://tva3.sinaimg.cn/large/87c01ec7gy1frmrycqdnyj21hc0u0qc3.jpg' },
        { url: 'https://tva1.sinaimg.cn/large/87c01ec7gy1frmr4o35kuj21kw0w0kjy.jpg' },
        { url: 'https://tva3.sinaimg.cn/large/87c01ec7gy1frmrtvbv2ij21hc0u07de.jpg' },
        { url: 'https://tva4.sinaimg.cn/large/87c01ec7gy1frmn0empcsj21kw0w0e87.jpg' },
        { url: 'https://tva1.sinaimg.cn/large/87c01ec7gy1frmmw9573mj21kw0w0npk.jpg' },
        { url: 'https://tva3.sinaimg.cn/large/87c01ec7gy1frmmihp11yj21hc0u0hdu.jpg' },
        { url: 'https://tva1.sinaimg.cn/large/87c01ec7gy1frmmz605z4j21kw0w0qvh.jpg' },
        { url: 'https://tva4.sinaimg.cn/large/87c01ec7gy1frmrsc1lktj21hc0u07dd.jpg' },
        { url: 'https://tva2.sinaimg.cn/large/0060lm7Tly1ftg6otk3cqj31hc0u014s.jpg' }
      ]

    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log("this is current swiper instance object", this.swiper)
    // this.swiper.slideTo(3, 1000, false);
  }
}
</script>
<style>
.recommendPage .swiper-wrapper {
  transition-timing-function:  cubic-bezier(1,1,1,1) !important;
  /* transition-timing-function: linear !important; */

}
.swiper-box {
  width: 600px;
  height: 300px;
  border: 1px solid rosybrown;
}

img {
  width: 600px;
  height: 300px;
}
</style>
