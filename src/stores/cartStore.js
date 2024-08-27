// 封裝購物車模塊

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  //1.定義state - cartList
  const cartList = ref([])
  //2.定義action - addCart
  const addCart = (goods) => {
    // 添加購物車操作
    // 已添加過 - count + 1
    // 沒有添加過 - 直接push
    // 思路：通過匹配傳遞過來的商品對象中的skuId, 
    //       能不能在cartList中找到，找到了就是添加過
    const item = cartList.value.find(item => goods.skuId === item.skuId)
    if(item){
      // 找到了
      item.count++
    }else{
      cartList.value.push(goods)
    }
  }

  // 刪除購物車
  const delCart = (skuId) => {
    // 思路：
    // 1.找到要刪除項的下標值 - splice
    // 2.使用數組的過濾方法 - filter
    const idx = cartList.value.findIndex((item)=> skuId === item.skuId)
    cartList.value.splice(idx, 1)
  }
  return {
    cartList,
    addCart,
    delCart
  }
},
{
  persist: true,  // 持久化到localStorage
});