<template>
  <div class="login-outer">
    <transition name="el-fade-in">
      <el-dialog v-model="isPopUpShow" title="Register">
        <el-form :model="registerUser">
          <el-form-item label="username" label-width="100px">
            <el-input v-model="registerUser.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="password" label-width="100px">
            <el-input v-model="registerUser.password" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isPopUpShow = false">Cancel</el-button>
            <el-button type="primary" @click="confirmRegister">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
    </transition>
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
          <el-input 
            v-model="userInfo.username" 
            prefix-icon="UserFilled"
            autoFocus
          />
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
          <el-button type="success" size="small" bg text @click="isPopUpShow = true">注册</el-button>
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

import { createUser, login } from '../service'

const inputFormRef = ref()

const validateName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const userInfo = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }]
})

// 登录
const router = useRouter()
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      console.log('submit!')
      const res = await login(userInfo.username, userInfo.password)
      if(res?.id) {
        sessionStorage.setItem('token', res?.token)
        router.push('/home')
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

// 注册
const isPopUpShow = ref(false)
const registerUser = reactive({
  username: '',
  password: ''
})
const confirmRegister = async () => {
  isPopUpShow.value = false
  const res = await createUser(registerUser.username, registerUser.password)
  if(res.affectedRows === 1) {
    ElMessage.success('注册成功，现在可以去登录了🎉')
  }
}

</script>

<style lang="less" scoped>
.login-outer {
  background-image: url('../assets/images/TeaGardensMunnar.jpg');
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