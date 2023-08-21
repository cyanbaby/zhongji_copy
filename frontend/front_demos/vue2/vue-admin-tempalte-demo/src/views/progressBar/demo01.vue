<template>
  <div class="demo">

    <body>
      <h1>大前端之旅</h1>
      <h3>Flipping Card: An Example</h3>

      <div class="card">
        <div class="card__content">
          <div class="card__front">
            <!-- <h1>?</h1> -->
            <span>这是正面</span>
          </div>
          <div class="card__back">
            <!-- <h1>This is a big secret</h1> -->
            <h1>这是反面</h1>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>
<script>
// 参考: https://cloud.tencent.com/developer/article/1968599
export default {

}
</script>

<style lang="scss">
.demo {
  margin: 20px;
}

.card {
  margin: auto;
  width: 300px;
  height: 400px;
  perspective: 1000px; // https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective
  background-color: transparent;
}

.card__content {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: all 1s;
  transform-style: preserve-3d;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
}

.card:hover .card__content {
  // transform: rotateX(180deg);
  transform: rotateY(180deg);

}

.card__front,
.card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.card__front {
  background-color: red;
  font-size: 150px;
}

.card__back {
  background-color: indigo;
  transform: rotateY(180deg);
  font-size: 36px;
}
</style>
