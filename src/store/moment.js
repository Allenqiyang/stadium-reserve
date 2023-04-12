import { defineStore } from "pinia"

export default defineStore('moment', {
  state: () => {
    return {
      momentDetail: {}
    }
  }
})