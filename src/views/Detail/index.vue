<script setup>
import DetailHot from "@/views/Detail/components/DetailHot.vue";
// import ImageView from '@/components/ImageView/index.vue'
// import XtxSku from '@/components/XtxSku/index.vue'
import {getDetail} from '@/apis/detail'
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import { ElMessage } from "element-plus";
import { useCartStore } from "@/stores/cartStore";

const route = useRoute()
const cartStore=useCartStore()
const goods = ref({})
const getGoods = async() =>{
  const res = await getDetail(route.params.id)
  goods.value = res.result
}

onMounted(() => getGoods() )

//sku規格被操作時
let skuObj = {}
const skuChange = (sku) => {
  console.log(sku)
  skuObj = sku
} 

//count
const count = ref(1)
const countChange = (count) => {
  console.log(count)
  count.value=count
}

// 添加購物車
const addCart = () => {
  if(skuObj.skuId) {
  // 規格已經選擇 觸發action
  cartStore.addCart({
      id: goods.value.id,
      name: goods.value.name,
      picture : goods.value.mainPictures[0],
      price: goods.value.price,
      count: count.value,
      skuId: skuObj.skuId,
      attrsText:skuObj.specsText,
      selected: true 
    })
  }else{
    // 規格沒有選擇 提示用戶
    ElMessage.warning('請選擇規格')
  }
}


</script>

<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goods.details">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <!-- <el-breadcrumb-item :to="{ path: '/' }">母嬰 -->
            <!--
               錯誤原因：goods一開始{} {}.categories -> undefined -> undefined[1]
               1.可選鏈的語法?.
               2.v-if 手動控制渲染時機，保證只有數據存在才渲染
             -->
          <!-- <el-breadcrumb-item :to="{ path: `/category/${goods.categories?.[1].id}` }">{{ goods.categories?.[1].name }} -->
          <el-breadcrumb-item :to="{ path: `/category/${goods.categories[1].id}` }">{{ goods.categories[1].name }}
          </el-breadcrumb-item>
          <!-- <el-breadcrumb-item :to="{ path: '/' }">跑步鞋 -->
          <!-- <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories?.[0].id}` }">{{ goods.categories?.[0].name }} -->
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories[0].id}` }">{{ goods.categories[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>抓絨保暖，毛毛蟲子兒童運動鞋</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 圖片預覽區 -->
               <!-- <ImageView :imageList=""/>  -->
               <!-- <ImageView :image-list="goods.mainPictures"/>  -->
               <XtxImageView :image-list="goods.mainPictures"/> 
              <!-- 統計數量 -->
              <ul class="goods-sales">
                <li>
                  <p>銷量人氣</p>
                  <!-- <p> 100+ </p> -->
                  <p> {{ goods.salesCount }}+ </p>
                  <p><i class="iconfont icon-task-filling"></i>銷量人氣</p>
                </li>
                <li>
                  <p>商品評價</p>
                  <!-- <p>200+</p> -->
                  <p>{{ goods.commentCount }}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看評價</p>
                </li>
                <li>
                  <p>收藏人氣</p>
                  <!-- <p>300+</p> -->
                  <p>{{ goods.collectCount }}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <!-- <p>400+</p> -->
                  <p>{{ goods.brand.name }}+</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主頁</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息區 -->
              <!-- <p class="g-name"> 抓絨保暖，毛毛蟲子兒童鞋 </p>
              <p class="g-desc">好穿 </p> -->
              <p class="g-name"> {{ goods.name }} </p>
              <p class="g-desc">{{ goods.desc }} </p>
              <p class="g-price">
                <!-- <span>200</span>
                <span> 100</span> -->
                <span>{{ goods.oldPrice }}</span>
                <span> {{ goods.price }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促銷</dt>
                  <dd>12月好物放送，App領券購買直降120元</dd>
                </dl>
                <dl>
                  <dt>服務</dt>
                  <dd>
                    <span>無優退貨</span>
                    <span>快速退款</span>
                    <span>免費包郵</span>
                    <a href="javascript:;">了解詳情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <XtxSku :goods="goods" @change="skuChange"/>
              <!-- 數據组件 -->
              <el-input-number v-model="count" @change="countChange"/>
              <!-- 按鈕组件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart">
                  加入購物車
                </el-button>
              </div>

            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品詳情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品詳情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <!-- <li v-for="item in 3" :key="item.value"> -->
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <!-- <span class="dt">白色</span>
                      <span class="dd">純棉</span> -->
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="img in goods.details.pictures" :src="img" :key="img" alt="">
                </div>
              </div>
            </div>
            <!-- 24熱榜+專題推薦 -->
            <div class="goods-aside">
              <!-- 24小時 -->
              <DetailHot :hot-type="1"/>
              <!-- 周 -->
              <DetailHot :hot-type="2"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
</style>