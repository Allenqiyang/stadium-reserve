<template>
  <div>
    <NavBar/>
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <div class="page-footer">
      运动之前记得热身，运动过程中也请注意安全⛄
    </div>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue"
</script>

<style>
.page-footer {
  background-color: #303133;
  color: #ffffff;
  text-align: center;
  height: 60px;
  line-height: 60px;
  margin-top: 20px;
}
</style>