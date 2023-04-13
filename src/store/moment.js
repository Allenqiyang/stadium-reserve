import { defineStore } from "pinia"

import cache from "@/utils/cache"
import { getMomentDetail } from "@/service"

export default defineStore('moment', {
  state: () => {
    return {
      momentDetail: {}
    }
  },
  actions: {
    async storeMomentDetail(momentId) {
      if(momentId) {
        const [detail] = await getMomentDetail(momentId)
        this.momentDetail = detail
        cache.setCache('momentDetail', detail)
      }
    },
    loadLocalData() {
      const detail = cache.getCache('momentDetail')
      if(detail) {
        this.momentDetail = detail
      }
    }
  }
})