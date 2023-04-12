import { defineStore } from "pinia"
import cache from "@/utils/cache"

export default defineStore('user', {
  state: () => {
    return {
      userInfo: {}
    }
  },
  actions: {
    storeUserInfo(info) {
      this.userInfo = info
      cache.setCache('user', info)
    },
    loadLocalData() {
      const token = cache.getCache('token')
      if(token) {
        this.token = token
      }
      const userInfo = cache.getCache('user')
      if(userInfo) {
        this.userInfo = JSON.parse(userInfo)
      }
    }
  }
})