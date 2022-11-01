import { defineStore } from "pinia"

export const useMomentStore = defineStore('moment', {
  state: () => {
    return {
      momentDetail: {}
    }
  }
})