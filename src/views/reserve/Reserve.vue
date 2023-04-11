<template>
  <div class="reserve-outer">
    <el-radio-group v-model="chosenStadium" class="choose-stadium">
      <el-radio-button label="1">羽毛球</el-radio-button>
      <el-radio-button label="2">篮球</el-radio-button>
      <el-radio-button label="3">足球</el-radio-button>
      <el-radio-button label="4">乒乓球</el-radio-button>
    </el-radio-group>
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
            <el-button 
              size="small" 
              @click="confirmReserve(scope.$index)"
              :disabled="stadiumStatus[scope.$index]"
              >预约</el-button>
            <el-button
              size="small"
              type="danger"
              @click="confirmCancel(scope.$index)"
              :disabled="!stadiumStatus[scope.$index]"
              >取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { getStadiumStatus, reserve, cancel } from "../../service"

const chosenStadium = ref('1')

const badminton = ref({})
const basketball = ref({})
const football = ref({})
const tabletennis = ref({})
const getStadiums = async () => {
  [badminton.value, basketball.value, football.value, tabletennis.value] = await getStadiumStatus()
  currentStadium.value = badminton.value
  for(const key in currentStadium.value) {
    if(key.includes('period')) {
      stadiumStatus.value.push(parseInt(currentStadium.value[key]))
    }
  }
}
getStadiums()

const tableData = [
  '9:00 - 10:00', 
  '10:00 - 11:00', 
  '11:00 - 12:00', 
  '14:00 - 15:00', 
  '15:00 - 16:00', 
  '16:00 - 17:00', 
  '17:00 - 18:00'
]

const currentStadium = ref({})
const stadiumStatus = ref([])

const refreshStadiumStatus = (currentStadium) => {
  let index = 0
  for(const key in currentStadium) {
    if(key.includes('period')) {
      stadiumStatus.value[index] = parseInt(currentStadium[key])
      index++
    }
  }
}
watch(chosenStadium, (choice) => {
  switch(choice) {
    case '1':
      currentStadium.value = badminton.value
      refreshStadiumStatus(currentStadium.value)
      break
    case '2':
      currentStadium.value = basketball.value
      refreshStadiumStatus(currentStadium.value)
      break
    case '3':
      currentStadium.value = football.value
      refreshStadiumStatus(currentStadium.value)
      break
    case '4':
      currentStadium.value = tabletennis.value
      refreshStadiumStatus(currentStadium.value)
      break
  }
})

const confirmReserve = (index) => {
  reserve(index+1, currentStadium.value.id)
  location.reload()
}
const confirmCancel = (index) => {
  cancel(index+1, currentStadium.value.id)
  location.reload()
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
  
  .table-container {
    width: 400px;
    margin: 0 auto 50px;
  }
}
</style>