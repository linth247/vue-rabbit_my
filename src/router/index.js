
//createRouter: 創建router實例對象
//createWebHistory: 創建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component對應關的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'',
          component: Home
        },
        {
          path:'category/:id',
          component: Category
        },
        {
          path:'category/sub/:id',
          component: SubCategory
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
  ]
})

export default router
