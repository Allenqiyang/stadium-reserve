<template>
  <div class="write-moment">
    <el-input
      v-model="momentText"
      rows="5"
      type="textarea"
      resize="none"
      placeholder="有什么想和大家分享的~"
    />
    <el-button @click="confirmPublishMoment" type="primary">发布</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { publishMoment } from '@/service'
import { ElMessage } from 'element-plus'
import "element-plus/theme-chalk/el-message.css"

const emit = defineEmits(['momentPublish'])

const momentText = ref('')
const confirmPublishMoment = async () => {
  if(momentText.value === '') {
    ElMessage.warning('不能发布空白内容哦')
    return
  }
  const res = await publishMoment(momentText.value)
  if(res.affectedRows === 1) {
    ElMessage.success('动态发布成功啦🎉')
  }
  momentText.value = ''
  emit('momentPublish')
}
</script>

<style lang="less" scoped>
.write-moment {
  border-radius: 10px;
  background-color: rgba(244, 255, 255, 0.9);
  width: 700px;
  height: 195px;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-textarea {
    width: 650px;
    margin-bottom: 20px;
  }
}
</style>
