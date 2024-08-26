import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
// import { useIntersectionObserver } from '@vueuse/core'

// 引入初始化樣式文件
import '@/styles/common.scss'

// 引入懶加載指令插件並且注冊
import { lazyPlugin } from '@/directives'

//引入全局組件插件
import {componentPlugin} from '@/components'

// 測試接口函數
// import {getCategory} from '@/apis/testAPI'
// getCategory().then(res => {
//     console.log(res)
// })
const app = createApp(App)

// let foo

const pinia = createPinia()
// 注冊持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')


// 定義全局指令

// app.directive('img-lazy', {
// 	mounted(el, binding){
// 		// el: 指令綁定的那個元素 img
// 		// binding: binding.value 指令等於號後面綁定的表達式的值 圖片url
// 		console.log(el, binding.value)
// 		const { stop } = useIntersectionObserver(
// 			el,
// 			([{ isIntersecting }]) => {
// 				console.log(isIntersecting)
// 				if (isIntersecting) {
// 					// 進入視口區域
// 					el.src = binding.value
// 					stop()
// 				}
// 			},
// 		)
// 	}
// })