// 封裝倒計時邏輯函數

import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
  //1.響應式的數據
  let timer = null
  const time = ref(0)
  // 格式化時間 為 xx分xx秒
  const formatTime = computed(()=> dayjs.unix(time.value).format('mm分ss秒'))
  //2.開啟倒計時的函數
  const start = (currentTime) => {
    // 開始倒計時的邏輯
    // 核心邏輯的編寫：每隔1s就減一
    time.value = currentTime
    setInterval(()=>{
      time.value--
    }, 1000)
  }
  // 組件銷毀時，清除定時器
  onUnmounted(()=>{
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}