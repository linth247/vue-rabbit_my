<script setup>
import { getOrderAPI } from '@/apis/pay'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useCountDown } from '@/composables/useCountDown.js'
const { formatTime, start} = useCountDown()
// start(60)


// 獲取訂單數據
const route = useRoute()
const payInfo = ref({})
const getPayInfo = async() => {
  const res = await getOrderAPI(route.query.id)
  payInfo.value = res.result
  // 初始化倒計時秒數
  start(res.result.countdown)
}
onMounted(() => getPayInfo())

// 跳轉支付
// 攜帶訂單id以及回調地址跳轉到支付地址(get)
// 支付地址

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const backURL = 'http://127.0.0.1:5173/paycallback'
const redirectUrl = encodeURIComponent(backURL)
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`
</script>


<template>
    <!-- {{ formatTime }} -->
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>訂單提交成功！請儘快完成支付。</p>
          <p>支付還剩 <span>{{ formatTime }}</span>, 超時後將取消訂單</p>
        </div>
        <div class="amount">
          <span>應付總額：</span>
          <span>¥{{ payInfo.payMoney?.toFixed(2) }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">選擇以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" :href="payUrl"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商銀行</a>
          <a class="btn" href="javascript:;">工商銀行</a>
          <a class="btn" href="javascript:;">建設銀行</a>
          <a class="btn" href="javascript:;">農業銀行</a>
          <a class="btn" href="javascript:;">交通銀行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-pay-page {
  margin-top: 20px;
}

.pay-info {

  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    padding-left: 10px;
    flex: 1;

    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }

      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}

.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
      border-color: $xtxColor;
    }

    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
    }

    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
    }
  }
}
</style>