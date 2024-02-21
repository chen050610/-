import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
//element的部分
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入svg图标
import 'virtual:svg-icons-register'
import pinia from '@/store/index.js'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, {
    locale: zhCn,
})

app.use(router)
app.use(pinia)
app.mount('#app')


