<template>
  <div class="reserve-outer">
    <el-radio-group v-model="chosenStadium" class="choose-stadium" @change="refreshStatus">
      <el-radio-button :label="1">羽毛球</el-radio-button>
      <el-radio-button :label="2">篮球</el-radio-button>
      <el-radio-button :label="3">足球</el-radio-button>
      <el-radio-button :label="4">乒乓球</el-radio-button>
    </el-radio-group>
    <div class="choose-detail">
      <el-select v-model="chosenDate" placeholder="选择预约日期" @change="refreshStatus">
        <el-option 
          v-for="item of dates"
          :value="item.value"
          :key="item.value"
          :label="item.label"
        />
      </el-select>
      <el-select v-model="chosenCourt" placeholder="选择预约场地" @change="refreshStatus">
        <el-option 
          v-for="item of courts"
          :value="item.value"
          :key="item.value"
          :label="item.label"
        />
      </el-select>
    </div>
    <ReserveConfirm :isConfirmShow="isReserveShow" @success="confirmReserve" @closeConfirm="closeReserve"/>
    <ReserveConfirm :isConfirmShow="isCancelShow" @success="confirmCancel" @closeConfirm="closeCancel"/>
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%" table-layout="auto">
        <el-table-column label="Time" width="210">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template #default="scope">
            <div v-if="operable[scope.$index]">
              <el-button 
                size="small" 
                @click="doReserve(scope.$index)"
                :disabled="Boolean(courtStatus[scope.$index])"
              >预约</el-button>
              <el-button
                size="small"
                type="danger"
                @click="doCancel(scope.$index)"
                :disabled="Boolean(!courtStatus[scope.$index])"
              >取消</el-button>
            </div>
            <div v-else style="color:#C0C4CC; padding-left: 22px;">
              已被预约
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"

import { ElMessage } from "element-plus"
import "element-plus/theme-chalk/el-message.css"

import { getStadiumStatus, reserve, cancel } from "../../service"
import { useUserStore } from "@/store"
import ReserveConfirm from "./childs/ReserveConfirm.vue"

// 1 羽毛   2 篮球   3 足球   4 乒乓
const chosenStadium = ref(1)
const stadiumToCourt = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
]

const chosenDate = ref(1)
const dates = [
  {
    value: 1,
    label: '明天'
  },
  {
    value: 2,
    label: '后天'
  },
  {
    value: 3,
    label: '大后天'
  }
]

const chosenCourt = ref(1)
const courts = [
  {
    value: 1,
    label: '场地一'
  },
  {
    value: 2,
    label: '场地二'
  },
  {
    value: 3,
    label: '场地三'
  },
  {
    value: 4,
    label: '场地四'
  }
]

const tableData = [
  '9:00 - 10:00', 
  '10:00 - 11:00', 
  '11:00 - 12:00', 
  '14:00 - 15:00', 
  '15:00 - 16:00', 
  '16:00 - 17:00', 
  '17:00 - 18:00'
]

const user = useUserStore()

const operable = ref(new Array(7).fill(1))
const courtStatus = ref([])

const currentCourtId = computed(() => stadiumToCourt[chosenStadium.value - 1][chosenCourt.value - 1])

const setCourtStatus = async () => {
  const res = await getStadiumStatus(currentCourtId.value, chosenDate.value)
  operable.value.fill(1)
  courtStatus.value.fill(0)
  res.forEach(item => {
    courtStatus.value[item.period - 1] = 1
    if(item.user_id !== user.userInfo.id) {
      operable.value[item.period - 1] = 0
    }
  })
}
onMounted(() => {
  setCourtStatus()
})

const refreshStatus = () => {
  setCourtStatus()
}

const isReserveShow = ref(false)
const isCancelShow = ref(false)

const closeReserve = () => {isReserveShow.value = false}
const closeCancel = () => {isCancelShow.value = false}

const currentPeriod = ref(0)
const doReserve = (index) => {
  const period = index + 1
  currentPeriod.value = period
  isReserveShow.value = true
}
const doCancel = (index) => {
  const period = index + 1
  currentPeriod.value = period
  isCancelShow.value = true
}

const confirmReserve = async () => {
  const res = await reserve(currentCourtId.value, chosenDate.value, currentPeriod.value)
  if(res.affectedRows === 1) {
    ElMessage.success('预约成功')
  }
  isReserveShow.value = false
  refreshStatus()
}
const confirmCancel = async () => {
  const res = await cancel(currentCourtId.value, chosenDate.value, currentPeriod.value)
  if(res.affectedRows === 1) {
    ElMessage.success('取消成功')
  }
  isCancelShow.value = false
  refreshStatus()
}

</script>

<style lang="less" scoped>
.reserve-outer {
  border: 1px #CDD0D6 solid;
  width: 700px;
  margin: 10px auto;
  background-color: #F5F7FA;
  padding-top: 20px;

  .choose-stadium {
    margin-bottom: 30px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .choose-detail {
    display: flex;
    width: 310px;
    margin: 0 auto;
  }

  .el-select {
    margin-left: 8px;
    margin-right: 8px;
    top: -15px;
  }
  
  .table-container {
    width: 400px;
    margin: 0 auto 50px;
  }
}
</style>