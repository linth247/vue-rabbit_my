// 封裝購物車模塊

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
  // 一定要在回調函數裡面調用，才能保證拿到訊息
  const userStore = useUserStore()
  const isLogin = computed(()=>userStore.userInfo.token)

  //1.定義state - cartList
  const cartList = ref([])
  
  // 獲取最新購物車列表action
  const updateNewList = async() =>{
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }
  
  //2.定義action - addCart
  const addCart = async(goods) => {
    const { skuId, count } = goods
    if(isLogin.value){
      // 登入之後的加入購物車邏輯
      // 1.調用加入購物車接口
      // 2.調用獲取購物車列表接口
      // 3.用接口購物車列表覆蓋本地購物車列表
      await insertCartAPI({ skuId, count})
      // const res = await findNewCartListAPI()
      // cartList.value = res.result
      updateNewList()
    }else{
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
        // 沒找到
        cartList.value.push(goods)
      }
    }
  }

  // 刪除購物車
  const delCart = async(skuId) => {
    if(isLogin.value){
      // 調用接口實現接口購物車中的刪除功能
      // 1.調用刪除購物車接口
      // 2.調用獲取購物車列表接口
      // 3.用接口購物車列表覆蓋本地購物車列表
      await delCartAPI([skuId])
      // const res = await findNewCartListAPI()
      // cartList.value = res.result
      updateNewList()
    }else{
      // 思路：
      // 1.找到要刪除項的下標值 - splice
      // 2.使用數組的過濾方法 - filter
      const idx = cartList.value.findIndex((item)=> skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }


  // 清除購物車
  const clearCart = () => {
    cartList.value = []
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

  // 3.已選擇數量
  const selectedCount = computed(()=> cartList.value.filter(item => item.selected).reduce((a,c)=> a + c.count,0))
  // 4.已選擇商品價錢合計
  const selectedPrice = computed(()=> cartList.value.filter(item => item.selected).reduce((a,c)=> a + c.count * c.price,0))
  // 是否全選
  const isAll = computed(()=> cartList.value.every((item)=>item.selected))

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    clearCart,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    updateNewList
  }
},
{
  persist: true,  // 持久化到localStorage
});