<template>
  <div class="personal">
    <el-button class="back-home" link type="primary" @click="backHome">
      <el-icon><House /></el-icon>
      <span style="margin-left: 5px">返回主页</span>
    </el-button>
    <h3 class="title">⛹️ 个人中心</h3>
    <div class="user">
      <div class="avatar">
        <img :src="userInfo.avatarUrl" alt="">
      </div>
      <div class="user-info">
        <p class="user-name">{{userInfo.name}}</p>
        <div class="upload">
          <el-upload
            ref="uploadRef"
            action=""
            :on-change="fileUpload"
            :auto-upload="false"
            :limit="1"
          >
            <template #trigger>
              <el-button bg text>更换头像</el-button>
            </template>
          </el-upload>
        </div>
        <el-button type="success" class="confirm-upload" @click="confirmUpload">确认上传</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'
import "element-plus/theme-chalk/el-message.css"

import { useUserStore } from '@/store'
import { uploadAvatar, getUserInfo } from '@/service'

const store = useUserStore()
const { userInfo } = storeToRefs(store)

const router = useRouter()
const backHome = () => {
  router.push('/home')
}

const uploadRef = ref()

const form = new FormData()
const fileUpload = (file) => {
  form.append('avatar', file.raw)
}
const confirmUpload = async () => {
  await uploadAvatar(form)
  const newInfo = await getUserInfo(userInfo.value.id)
  ElMessage.success('头像更换成功🎉')
  uploadRef.value.clearFiles()
  store.storeUserInfo(newInfo)
}
</script>

<style lang="less" scoped>
.personal {
  .back-home {
    position: absolute;
    left: 40px;
    top: 26px;
  }

  .title {
    margin-left: 157px;
    margin-top: 25px;
    margin-bottom: 40px;
  }

  .user {
    width: 992px;
    margin: 0 auto;
    display: flex;
  }
  
  .avatar {
    img {
      height: 164px;
      width: 164px;
      min-width: 164px;
      border-radius: 82px;
      border-color: rgba(0, 0, 0, 0.06);
      border-width: 1px;
      border-style: solid;
    }
  }

  .user-info {
    position: relative;
    margin-left: 52px;

    .user-name {
      font-size: 24px;
      line-height: 32px;
      font-weight: 500;
      margin-top: 12px;
    }

    .upload {
      width: 200px;
    }

    .confirm-upload {
      position: absolute;
      top: 68px;
      left: 100px;
    }
  }
}
</style>