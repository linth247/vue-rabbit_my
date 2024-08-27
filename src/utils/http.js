//axios基礎的封裝
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'

const httpInstance = axios.create({
 baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
 timeout: 5000
})

// 攔截器
// axios请求攔截器
httpInstance.interceptors.request.use(config => {
	//1.從pinia獲取token數據
	const userStore = useUserStore()
	//2.按照後端的要求拼接token數據
	const token = userStore.userInfo.token
	if(token){
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
}, e => Promise.reject(e))
  
// axios响应式攔截器
httpInstance.interceptors.response.use(res => res.data, e => {
    // 統一錯誤提示
    ElMessage({
        type:'warning',
        message: e.response.data.message
    })
    return Promise.reject(e)
})

export default httpInstance