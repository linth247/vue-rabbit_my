// 定義懶加載插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app){
    //懶加載指令邏輯
    app.directive('img-lazy', {
      mounted(el, binding){
        // el: 指令綁定的那個元素 img
        // binding: binding.value 指令等於號後面綁定的表達式的值 圖片url
        // console.log(el, binding.value)
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            // console.log(isIntersecting)
            if (isIntersecting) {
              // 進入視口區域
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}