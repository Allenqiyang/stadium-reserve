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
        <div class="user-name">
          <p>{{userInfo.name}}</p>
          <template v-if="!editing">
            <el-button
              @click="startEdit"
              :icon="Edit" bg text
              type="primary"
              class="change-name"
            >
              change
            </el-button>
          </template>
          <template v-else>
            <el-input 
              v-model="editName" 
              @blur="changeName" 
              @keydown.enter="$event.target.blur()"
              ref="input" 
              class="change-input"
            />
          </template>
        </div>
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
import { nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'
import "element-plus/theme-chalk/el-message.css"
import { Edit } from '@element-plus/icons-vue'

import { useUserStore } from '@/store'
import { uploadAvatar, getUserInfo, updateUserName } from '@/service'

const store = useUserStore()
const { userInfo } = storeToRefs(store)

const router = useRouter()
const backHome = () => {
  router.push('/home')
}

const editing = ref(false)
const input = ref()
const startEdit = () => {
  editing.value = true
  nextTick(() => {
    input.value.focus()
  })
}
const editName = ref('')
const changeName = async () => {
  if(editName.value.length === 0) {
    editing.value = false
    return
  }
  const res = await updateUserName(editName.value)
  if(res.code === 100) {
    ElMessage.success('修改成功')
    const newInfo = await getUserInfo(userInfo.value.id)
    store.storeUserInfo(newInfo)
    editName.value = ''
    editing.value = false
  }
}

const uploadRef = ref()

const form = new FormData()
const fileUpload = (file) => {
  form.append('avatar', file.raw)
}
const confirmUpload = async () => {
  if(form.getAll('avatar').length === 0) {
    ElMessage.warning('请先上传图片')
    return
  }
  await uploadAvatar(form)
  const newInfo = await getUserInfo(userInfo.value.id)
  ElMessage.success('头像更换成功🎉')
  uploadRef.value.clearFiles()
  store.storeUserInfo(newInfo)
}
</script>

<style lang="less" scoped>
.personal {
  position: relative;

  .back-home {
    position: absolute;
    left: 40px;
    top: 2px;
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
      display: flex;

      p {
        font-size: 24px;
        line-height: 32px;
        font-weight: 500;
        margin-top: 12px;
        margin-right: 24px;
      }

      .change-name {
        margin-top: 10px;
      }

      .change-input {
        width: 85px;
        height: 33px;
        margin: 11px 0;
      }
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