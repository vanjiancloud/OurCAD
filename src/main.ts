import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import './assets/common.less'
import './assets/icon/iconfont.css'

const app = createApp(App)

if (process.env.NODE_ENV !== 'development') {
    console.log = function () {}
    console.error = function(){}
    console.dir = function(){}
}

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
