import { createApp } from 'vue'
import App from './App.vue'


//原来的代码
// createApp(App).mount('#app')

//修改后的代码
const app=createApp(App);
app.mount('#app');