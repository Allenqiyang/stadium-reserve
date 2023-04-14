<template>
  <div class="reserve-confirm">
    <transition name="el-fade-in">
      <div>
        <el-dialog 
          v-model="confirmShow"
          :show-close="false"
          title="Do you confirm"
          @close="closeConfirm"
          width="30%"
          center
        >
          <template #default>
            <div class="btns">
              <el-button @click="closeConfirm">Cancel</el-button>
              <el-button type="primary" @click="confirmReserve">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isConfirmShow: Boolean
})
const emit = defineEmits(['closeConfirm', 'success'])

const confirmShow = ref(props.isConfirmShow)

watch(() => props.isConfirmShow, () => {confirmShow.value = props.isConfirmShow})

const confirmReserve = () => {
  emit('success')
}

const closeConfirm = () => {
  emit('closeConfirm')
}
</script>

<style lang="less" scoped>
.reserve-confirm {
  :deep(.el-dialog) {
    border-radius: 10px;
  }

  :deep(.el-dialog__header) {
    margin-right: 0;
  }

  .btns {
    display: flex;
    justify-content: center;
  }
}
</style>