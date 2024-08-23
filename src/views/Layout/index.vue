<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// 觸發獲取導航列表的action
import {useCategoryStore} from '@/stores/category'
import {onMounted} from 'vue'

const categoryStore = useCategoryStore()

// 觸發getCategory，才會有state的資料
onMounted(() => categoryStore.getCategory())
</script>

<template>
  <LayoutFixed/>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>



<!-- <template>
    <div>我是首頁</div>
    <div>二級路由出口</div>
    <RouterView/>
</template> -->