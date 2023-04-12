<template>
  <div class="nav-bar">
    <div class="top">
      <div class="left">🏠 Allen Stadium Reserve System</div>
      <div class="right">
        <el-dropdown>
          <div class="avatar">
            <img :src="userInfo.avatarUrl || require('@/assets' + backupAvatar)" alt="">
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="gotoPersonal">个人中心</el-dropdown-item>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">场馆</el-menu-item>
      <el-menu-item index="3">预约</el-menu-item>
      <el-menu-item index="4">动态</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/store'
import cache from '@/utils/cache'

let activeIndex = ref('1')
const router = useRouter()

const handleSelect = (key) => {
  switch(key) {
    case '1':
      router.push('/home')
      break
    case '2':
      router.push('/stadium')
      break
    case '3':
      router.push('/reserve')
      break
    case '4':
      router.push('/moment')
      break
    default:
      break
  }
}

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const backupAvatar = '/images/avatar.png'

const logout = () => {
  cache.deleteCache('token')
  router.push('/login')
}

const route = useRoute()
onMounted(() => {
  switch(route.path) {
    case '/home':
      activeIndex.value = '1'
      break;
    case '/stadium/basketball':
      activeIndex.value = '2'
      break
    case '/stadium/football':
      activeIndex.value = '2'
      break
    case '/stadium/badminton':
      activeIndex.value = '2'
      break
    case '/stadium/tennis':
      activeIndex.value = '2'
      break
    case '/reserve':
      activeIndex.value = '3'
      break
    case '/moment':
      activeIndex.value = '4'
      break
    case '/detail':
      activeIndex.value = '4'
      break
    default:
      break
  }
})

const gotoPersonal = () => {
  router.push('/personal')
}
</script>

<style lang="less" scoped>

.top {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background-color: rgb(246, 251, 255);
  .avatar {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

.el-menu {
  height: 50px;
  padding-left: 17%;
  font-weight: bold;
}
</style>