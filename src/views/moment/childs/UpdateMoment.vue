<template>
  <div class="update-moment">
    <transition name="el-fade-in">
      <div>
        <el-dialog v-model="updateShow" :show-close="false" title="修改动态" @close="closeUpdate">
          <el-input 
            v-model="updateText"
            rows="4"
            type="textarea"
            resize="none"
            placeholder="想修改成什么~"
          />
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="closeUpdate">Cancel</el-button>
              <el-button type="primary" @click="confirmUpdateMoment">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { updateMoment } from '@/service'
import { ElMessage } from 'element-plus'
import "element-plus/theme-chalk/el-message.css"

const props = defineProps({
  isUpdateShow: Boolean,
  momentId: Number
})
const emit = defineEmits(['closeUpdate', 'updateSuccess'])
const updateShow = ref(props.isUpdateShow)

watch(() => props.isUpdateShow, () => {updateShow.value = props.isUpdateShow})

const closeUpdate = () => {
  emit('closeUpdate')
}

const updateText = ref('')
const confirmUpdateMoment = async () => {
  const res = await updateMoment(props.momentId, updateText.value)
  if(res.affectedRows === 1) {
    ElMessage.success('动态更新成功🎉')
    emit('closeUpdate')
    emit('updateSuccess')
  }
}

</script>

<style lang="less" scoped>
:deep(.el-dialog) {
  border-radius: 10px;
}
</style>