import { createPinia } from 'pinia'

import useMomentStore from './moment'
import useUserStore from './user'

const pinia =  createPinia()

export default pinia

const setupStore = () => {
  const user = useUserStore()
  user.loadLocalData()
}

export {
  useMomentStore,
  useUserStore,
  setupStore
}