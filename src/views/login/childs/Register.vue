<template>
  <div class="register">
    <transition name="el-fade-in">
      <div>
        <el-dialog v-model="registerShow" :show-close="false" title="Register" @close="closeRegister">
          <el-form :model="registerUser" :rules="rules" ref="registerFromRef">
            <el-form-item label="username" label-width="100px" prop="username">
              <el-input v-model="registerUser.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="password" label-width="100px" prop="password">
              <el-input v-model="registerUser.password" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="closeRegister">Cancel</el-button>
              <el-button type="primary" @click="confirmRegister(registerFromRef)">
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
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import "element-plus/theme-chalk/el-message.css"

import { createUser } from '@/service'
import { rules } from '../rules'

const props = defineProps({
  isRegisterShow: Boolean
})
const emit = defineEmits(['closeRegister'])
const registerShow = ref(props.isRegisterShow)

const registerFromRef = ref()

watch(() => props.isRegisterShow, () => {registerShow.value = props.isRegisterShow})

const registerUser = reactive({
  username: '',
  password: ''
})
const confirmRegister = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await createUser(registerUser.username, registerUser.password)
      if(res.affectedRows === 1) {
        ElMessage.success('注册成功，现在可以去登录了🎉')
        emit('closeRegister')
      }
    } else {
      ElMessage.error("请正确输入账号和密码")
      return false
    }
  })
}

const closeRegister = () => {
  emit('closeRegister')
}
</script>

<style scoped lang="less">
:deep(.el-dialog) {
  border-radius: 10px;
}
</style>