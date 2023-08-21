<template>
  <div>
    <h2>watchEffect Watch</h2>
    <br />
    num={{ num }}
    <br />
    count={{ count }}
  </div>
</template>

<script>
// 1、watchEffect
// import {
//   reactive,
//   toRefs,
//   watchEffect
// } from "vue";
// export default {
//   setup() {
//     let data = reactive({
//       num: 1,
//       count: 1
//     })
//     // 默认监听执行一次， 能监听的更仔细
//     watchEffect(() => {
//       // console.log(`num=${data.num}`)
//       console.log(`count=${data.count}`)
//     })
//     setInterval(() => {
//       data.count++
//     }, 1000)
//     return {
//       ...toRefs(data)
//     }
//   }
// }

// 2、watch
import { reactive, toRefs, watch } from "vue";
export default {
  setup() {
    let data = reactive({
      num: 1,
      count: 1,
    });

    // 只能监听data（no,no,no 可以监听data.num），不执行默认监听
    watch(data, () => {
      console.log("data.num=" + data.num);
    });

    // watch reactive方法定义响应式的数据 和  watch ref 方法定义响应式的数据 区别
    // watch(() => data.num, (newData, oldData) => {
    //   console.log(newData)
    //   console.log(oldData)
    //   console.log("data.num=" + data.num)
    // })

    // setTimeout(() => {
    //   data.num++
    // }, 1000)
    setInterval(() => {
      data.num++;
    }, 1000);

    return {
      ...toRefs(data),
    };
  },
};
</script>
