<script setup>
import {getSubCategoryAPI, getCategoryFilterAPI} from '@/apis/category'
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
// import GoodsItem from '@/views/Home/components/GoodsItem.vue'
import GoodsItem from '../Home/components/GoodsItem.vue'

//獲取面包屑導航數據
const categoryData = ref({})
const route = useRoute()
const getCategoryData = async() => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
  // console.log(categoryData)
}

onMounted(() => getCategoryData() )

// 獲取基礎列表數據渲染
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoodList = async() => {
  const res = await getSubCategoryAPI(reqData.value)
  //console.log(res)
  goodList.value = res.result.items
}

onMounted(()=> getGoodList())

// tab切換回調
const tabChange=()=>{
  console.log("tab切换了",reqData.value.sortField)
  // 將頁數初始化為1
  reqData.value.page=1
  getGoodList()
}

// 加载更多
const disable = ref(false)
const load = async ()=>{
  console.log('加载更多数据')
  // 獲取下一頁數據
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value,...res.result.items]

  // 加載完畢 停止監聽
  if (res.result.items.length === 0) {
    disable.value = true;
  }
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人氣" name="orderNum"></el-tab-pane>
        <el-tab-pane label="評論最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disable">
         <!-- 商品列表-->
         <GoodsItem v-for="good in goodList" :good="good" :key="good.id" />
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>