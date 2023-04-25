import { createPinia } from 'pinia'
import router from '../router'

import useMomentStore from './moment'
import useUserStore from './user'
import { verifyToken } from '@/service'

const pinia =  createPinia()

export default pinia

const setupStore = async () => {
  const res = await verifyToken()
  if(res.code === 100) {
    const user = useUserStore()
    user.loadLocalData()
    const moment = useMomentStore()
    moment.loadLocalData()
  } else {
    router.push('/login')
  }
}

export {
  useMomentStore,
  useUserStore,
  setupStore
}