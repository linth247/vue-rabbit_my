// 封裝購物車模塊

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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

  // 單選功能
  const singleCheck = (skuId, selected) =>{
    // 通過skuId，找到要修改的那一項 然後把它的selected修改障傳過來的selected
    const item = cartList.value.find(item=>item.skuId === skuId)
    item.selected = selected
  }

  // 全選功能
  const allCheck = (selected) => {
    // 把cartList中的第一項的selected都設置為當前的全選框狀態
    cartList.value.forEach(item=>item.selected = selected)
  }

  // 計算屬性
  // 1.總的數量 所有項的count之和
  const allCount = computed(()=> cartList.value.reduce((a,c)=> a + c.count,0))
  // 2.總價 所有項的count*price之和
  const allPrice = computed(()=> cartList.value.reduce((a,c)=> a + c.count * c.price,0))

  // 是否全選
  const isAll = computed(()=> cartList.value.every((item)=>item.selected))

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    addCart,
    delCart,
    singleCheck,
    allCheck
  }
},
{
  persist: true,  // 持久化到localStorage
});