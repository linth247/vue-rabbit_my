<script setup>
//以24小時熱榜獲取數據渲染模版
import {getHotGoodsAPI} from '@/apis/detail'
import {ref, onMounted, computed} from 'vue'
import {useRoute} from 'vue-router'

//設計props參數 適配不同的title和數據

const props = defineProps({
  hotType: {
    type: Number,// 1代表24小时热销榜 2代表周热销榜 3代表总热销榜 可以使用type去适配title和数据列表
  }
})

// 適配title 1 - 24小時熱榜 2-周熱榜
const TYPEMAP = {
  1: '24小時熱榜',
  2: '周熱榜'
}
const title = computed(()=> TYPEMAP[props.hotType])
// const title = computed(()=> TYPEMAP[1])

// 1.封裝接口
// 2.調用接口渲染模版
const hotList = ref([])
const route = useRoute()
const getHotList = async() => {
  const res = await getHotGoodsAPI({
    id: route.params.id,
    type: props.hotType
  })
  hotList.value = res.result
}

onMounted(() => getHotList())
</script>


<template>
  <div class="goods-hot">
    <!-- <h3>周日榜單</h3> -->
    <h3>{{ title }}</h3>
    <!-- 商品區塊 -->
    <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" alt="" />
      <!-- <p class="name ellipsis">一双男鞋</p>
      <p class="desc ellipsis">一双好穿的男鞋</p>
      <p class="price">&yen;200.00</p> -->
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>