import request from '@/utils/http';

// 獲取詳情接口
export const getCheckoutInfoAPI = () => {
  return request({
    url:'/member/order/pre'
  })
}

// 創建訂單
export const createOrderAPI = (data) =>{
  return request({
    url:'/member/order',
    method:'POST',
    data
  })
}