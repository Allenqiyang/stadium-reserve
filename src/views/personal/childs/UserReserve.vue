<template>
  <div class="user-reserve">
    <span class="reserve-title">你的预约</span>
    <div class="reserve-info">
      <el-card 
        v-for="(item, index) of userReserve" 
        :key="item.id" shadow="hover" 
        :class="dynamicClass[index % 2]"
      >
        {{ reserveVenue(item.court_id) }}
        {{ reserveDate[item.date - 1] }}
        {{ reserveTime[item.period - 1] }}
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { getUserReserve } from '@/service'

const userReserve = ref({})

onMounted(async () => {
  userReserve.value = await getUserReserve()
})

const dynamicClass = ['blue', 'green']
const reserveVenue = (courtId) => {
  if (1 <= courtId && courtId <= 4) {
    return `羽毛球${courtId}号场`
  }
  if (5 <= courtId && courtId <= 8) {
    return `篮球${courtId % 4}号场`
  }
  if (9 <= courtId && courtId <= 12) {
    return `足球${courtId % 4}号场`
  }
  if (13 <= courtId && courtId <= 16) {
    return `乒乓球${courtId % 4}号场`
  }
}
const reserveDate = ['明天', '后天', '大后天']
const reserveTime = [
  '9:00 - 10:00', 
  '10:00 - 11:00', 
  '11:00 - 12:00', 
  '14:00 - 15:00', 
  '15:00 - 16:00', 
  '16:00 - 17:00', 
  '17:00 - 18:00'
]

</script>

<style lang="less" scoped>
.user-reserve {
  margin-left: 155px;
  margin-top: 30px;
  margin-bottom: 50px;

  .reserve-title {
    color: #262626;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }

  .reserve-info {
    display: flex;
    flex-wrap: wrap;
  }

  .el-card {
    width: 400px;
    margin-top: 15px;
    margin-right: 30px;
  }
  .blue {
    background-color: #d9ecff;
  }
  .green {
    background-color: #e1f3d8;
  }
}
</style>