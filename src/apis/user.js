// 封裝所有和用戶相關的接口函數
import request from '@/utils/http';
export const loginAPI = ({account, password}) => {
  return request({
    url:'/login',
    method:'POST',
    data:{
      account,
      password
    }
  })
}
