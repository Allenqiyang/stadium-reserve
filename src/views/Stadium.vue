<template>
  <div class="stadium-outer">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <span>🏀 篮球场</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span>⚽ 足球场</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span>🏓 乒乓球场</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>🏸 羽毛球场</span>
      </el-menu-item>
    </el-menu>
    <transition name="el-fade-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const handleSelect = (key) => {
  switch(key) {
    case '1':
      router.push('/stadium/basketball')
      break
    case '2':
      router.push('/stadium/football')
      break
    case '3':
      router.push('/stadium/tennis')
      break
    case '4':
      router.push('/stadium/badminton')
      break
    default:
      break
  }
}

</script>

<style lang="less" scoped>
.stadium-outer {
  position: relative;
  padding-top: 10px;
}
.el-menu {
  width: 200px;
  height: 450px;
  position: absolute;
  left: 80px;
  border: 1px #E4E7ED solid;
  display: inline-block;

  .is-active {
    background-color: #e6f4ff;
  }
}
</style>
