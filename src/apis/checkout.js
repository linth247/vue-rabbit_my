import request from '@/utils/http';

// 獲取詳情接口
export const getCheckoutInfoAPI = () => {
  return request({
    url:'/member/order/pre'
  })
}