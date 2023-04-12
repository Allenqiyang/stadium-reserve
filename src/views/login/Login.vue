<template>
  <div class="login-outer">
    <Register :isRegisterShow="isRegisterShow" @closeRegister="closeRegister"/>
    <div class="login-container">
      <el-form
        ref="inputFormRef"
        :model="userInfo"
        status-icon
        :rules="rules"
        label-width="120px"
      >
        <h3>Login</h3>
        <el-form-item class="input-item" label="username" prop="username">
          <el-input v-model="userInfo.username" prefix-icon="UserFilled" autoFocus/>
        </el-form-item>
        <el-form-item class="input-item" label="password" prop="password">
          <el-input
            v-model="userInfo.password"
            prefix-icon="Key"
            type="password"
            autocomplete="off"
            show-password
          />
        </el-form-item>
        <el-form-item class="register">
          <el-button type="success" size="small" bg text @click="isRegisterShow = true">注册</el-button>
        </el-form-item>
        <el-form-item class="submit-block">
          <el-button type="primary" @click="submitForm(inputFormRef)">登录</el-button>
          <el-button @click="resetForm(inputFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'
import "element-plus/theme-chalk/el-message.css"

import { useUserStore } from '@/store'
import { login, getUserInfo } from '../../service'
import { rules } from './rules'
import cache from '@/utils/cache'
import Register from './childs/Register.vue'

const inputFormRef = ref()

const userInfo = reactive({
  username: '',
  password: ''
})

const store = useUserStore()

// 登录
const router = useRouter()
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await login(userInfo.username, userInfo.password)
      if(res?.id) {
        cache.setCache('token', res?.token)
        const user = await getUserInfo(res.id)
        store.storeUserInfo(user)
        router.push('/home')
      }
    } else {
      ElMessage.error("请正确输入账号和密码")
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

// 注册
const isRegisterShow = ref(false)
const closeRegister = () => {isRegisterShow.value = false}
</script>

<style lang="less" scoped>
.login-outer {
  background-image: url('@/assets/images/TeaGardensMunnar.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 100vh;
  padding-top: 150px;
}

.login-container {
  border-radius: 15px;
  margin: 0 auto;
  width: 350px;
  height: 250px;
  padding: 35px 35px 15px 35px;
  background-color: rgb(252, 252, 252);
  border: 1px solid #e0dfdf;
  box-shadow: 0 0 25px #cac6c6;

  .el-form {
    text-align: center;

    .input-item {
      margin-left: -18px;
      margin-right: 10px;
    }

    .register {
      margin-left: 35px;
    }

    .submit-block {
      margin-top: 20px;
      margin-left: -5px;
    }
  }
}
</style>