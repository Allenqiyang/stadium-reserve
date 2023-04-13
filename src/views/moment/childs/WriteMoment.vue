<template>
  <div class="write-moment">
    <el-input
      v-model="momentText"
      rows="5"
      type="textarea"
      resize="none"
      placeholder="有什么想和大家分享的~"
    />
    <div class="publish">
      <el-upload
        ref="uploadRef"
        class="upload-image"
        action=""
        :file-list="fileList"
        :on-change="fileUpload"
        :auto-upload="false"
        :limit="6"
      >
        <template #trigger>
          <el-icon><PictureFilled /></el-icon>
        </template>
      </el-upload>
      <el-button @click="confirmPublishMoment" type="primary">发布</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { ElMessage } from 'element-plus'
import "element-plus/theme-chalk/el-message.css"

import { publishMoment, uploadImage } from '@/service'

const emit = defineEmits(['momentPublish'])

const momentText = ref('')
const uploadRef = ref()
const fileList = ref([])
const form = new FormData()
const fileUpload = (file) => {
  form.append('picture', file.raw)
}

const confirmPublishMoment = async () => {
  if(momentText.value === '') {
    ElMessage.warning('不能发布空白内容哦')
    return
  }
  const res = await publishMoment(momentText.value)
  const momentId = res?.insertId
  await uploadImage(form, momentId)
  if(res.affectedRows === 1) {
    ElMessage.success('动态发布成功啦🎉')
  }
  momentText.value = ''
  uploadRef.value.clearFiles()
  emit('momentPublish')
}
</script>

<style lang="less" scoped>
.write-moment {
  border-radius: 10px;
  background-color: rgba(244, 255, 255, 0.9);
  position: relative;
  width: 700px;
  height: auto;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-textarea {
    width: 650px;
    margin-bottom: 20px;
  }

  .publish {
    .upload-image {
      position: relative;
      top: 5px;
      right: 130px;
      width: 300px;
      .el-upload {
        .el-icon {
          position: relative;
          left: 12px;
          transform: scale(1.5);
        }
      }
    }

    .el-button {
      position: absolute;
      top: 157px;
      right: 50px;
    }
  }
}
</style>
