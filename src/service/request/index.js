import axios from "axios"
import { ElLoading, ElMessage } from "element-plus"
import "element-plus/theme-chalk/el-loading.css"
import "element-plus/theme-chalk/el-message.css"
import { BASE_URL, TIME_OUT } from "./config"

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

let loading

service.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if(token) {
    config.headers = { 'Authorization': token, ...config.headers }
  }
  
  loading = ElLoading.service({
    lock: true,
    text: '加载中...'
  })
  return config
}, (error) => {
  ElMessage.error(error)
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  if(response.status == 200) {
    loading.close()
  }
  return response?.data
}, (error) => {
  loading.close()
  if(error.response) {
    ElMessage.error(error?.response?.data)
  } else {
    ElMessage.error(error.message)
  }
  return Promise.reject(error)
})

export default service