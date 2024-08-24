// 封裝分類數據業務相關代碼
import { ref, onMounted } from 'vue'
import {getCategoryAPI} from '@/apis/category'
import {useRoute} from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory(){
  //獲取數據
  const categoryData = ref([])
  const route = useRoute()
  const getCategory = async(id=route.params.id) =>{
      // const res = await getCategoryAPI(route.params.id)
      const res = await getCategoryAPI(id)
      categoryData.value = res.result
  }

  onMounted(() => getCategory())

  // 目標：路由參數變化的時候，可以把分類數據接口重新發送
  onBeforeRouteUpdate((to)=> {
    // console.log('路由變化了')
    // 存在問題：使用最新的路由參數請求最新的分類數據
    console.log(to)
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}