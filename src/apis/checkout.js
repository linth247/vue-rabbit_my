import request from '@/utils/http';

// 獲取詳情接口
export const getCheckInfoAPI = () => {
  return request({
    url:'/member/order/pre'
  })
}