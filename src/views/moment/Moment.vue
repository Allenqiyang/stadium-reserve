<template>
  <div class="moment-outer">
    <div class="moment-bg"></div>
    <div class="write-moment">
      <el-input 
        v-model="momentText"
        rows="5"
        type="textarea"
        resize="none"
        placeholder="有什么想和大家分享的~"
      />
      <el-button @click="confirmPublishMoment" type="primary">发布</el-button>
    </div>
    <div v-for="(moment, index) in momentList" :key="moment.id" class="moment-item">
      <div class="avator"></div>
      <p class="name">{{moment.user.name}}</p>
      <p class="time">{{moment.updateTime.slice(0, 10)}}</p>
      <p class="content" @click="jumpToDetail(moment.id)">{{moment.content}}</p>
      <div class="btns">
        <el-button type="primary" icon="Edit" @click="startEdit(moment.id)"/>
        <el-button 
          icon="ChatRound" 
          @click="isEditCommentShow[index] = !isEditCommentShow[index]"></el-button>
        <el-popconfirm title="要删除这条动态吗?" @confirm="confirmDelete(moment.id)">
          <template #reference>
            <el-button type="danger" icon="Delete"/>
          </template>
        </el-popconfirm>
      </div>
      <div v-show="isEditCommentShow[index]" class="write-comment">
        <el-input 
          v-model="commentText"
          rows="3"
          type="textarea"
          resize="none"
          placeholder="发一条友善的评论"
        />
        <el-button @click="confirmPublishComment(moment.id)" type="primary">发表评论</el-button>
      </div>
    </div>
    <div class="pagination">
      <el-button :disabled="offset === 0" @click="lastPage">&lt; 上一页</el-button>
      <el-button :disabled="offset + 8 >= momentCount.count" @click="nextPage">下一页 ></el-button>
    </div>
    <transition name="el-fade-in">
      <el-dialog v-model="isPopUpShow" title="修改内容">
        <el-input 
          v-model="updateText"
          rows="4"
          type="textarea"
          resize="none"
          placeholder="想修改成什么~"
        />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isPopUpShow = false">Cancel</el-button>
            <el-button type="primary" @click="confirmUpdateMoment">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMomentStore } from '../../store'
import { ElMessage } from 'element-plus'
import "element-plus/theme-chalk/el-message.css"

import { 
  publishMoment, 
  getMomentList, 
  updateMoment, 
  deleteMoment,
  writeComment,
  getMomentCount,
  getMomentDetail
} from '@/service'

const momentText = ref('')
const confirmPublishMoment = async () => {
  if(momentText.value === '') {
    ElMessage.warning('不能发布空白内容哦')
    return
  }
  publishMoment(momentText.value)
  momentText.value = ''
  momentList.value = await getMomentList(0, 8)
}

let offset = ref(0)
let momentCount = ref(0)
let momentList = ref({})
onMounted(async () => {
  momentCount.value = await getMomentCount()
  momentList.value = await getMomentList(offset.value, 8)
})

const router = useRouter()
const store = useMomentStore()
const jumpToDetail = async (momentId) => {
  const detail = await getMomentDetail(momentId)
  store.momentDetail = detail[0]
  router.push('/detail')
}

const lastPage = async () => {
  offset.value -= 8
  momentList.value = await getMomentList(offset.value, 8)
}
const nextPage = async () => {
  offset.value += 8
  momentList.value = await getMomentList(offset.value, 8)
}

const currentEdit = ref(0)
const isPopUpShow = ref(false)

const startEdit = (id) => {
  currentEdit.value = id
  isPopUpShow.value = true
}

const updateText = ref('')
const confirmUpdateMoment = async () => {
  isPopUpShow.value = false
  updateMoment(momentId, updateText.value).then(res => console.log(res))
  momentList.value = await getMomentList(0, 8)
}

const confirmDelete = async (momentId) => {
  deleteMoment(momentId)
  momentList.value = await getMomentList(0, 8)
}

const commentText = ref('')
const isEditCommentShow = ref(Array(8).fill(false))

const confirmPublishComment = (momentId) => {
  writeComment(momentId, commentText.value)
}


</script>

<style lang="less" scoped>
.moment-outer {
  padding-top: 20px;
  .moment-bg {
    background-image: url('@/assets/images/SchneebergOchsenkopf.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top;
    width: 100%;
    height: 2190px;
    opacity: 0.4;
    pointer-events: none;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
  }
  
  .write-moment {
    border-radius: 10px;
    background-color: rgba(244, 255, 255, 0.9);
    width: 700px;
    height: 195px;
    margin: 0 auto;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .el-textarea {
      width: 650px;
      margin-bottom: 20px;
    }
  }

  .moment-item {
    border-radius: 10px;
    background-color: rgb(246, 255, 255);
    width: 700px;
    margin: 20px auto 0;
    padding-top: 16px;
    padding-bottom: 20px;
    position: relative;

    .avator {
      position: absolute;
      background-image: url('@/assets/images/avatar.png');
      background-repeat: no-repeat;
      background-size: contain;
      border-radius: 50%;
      height: 48px;
      width: 48px;
      left: 24px;
      top: 24px;
    }

    .name {
      font-size: 16px;
      color: #222;
      margin-left: 92px;
    }

    .time {
      color: #99a2aa;
      font-size: 12px;
      margin-left: 90px;
      position: relative;
      top: -8px;
    }

    .content {
      width: 540px;
      margin-left: 90px;
      margin-top: -3px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .btns {
      margin-left: 90px;
    }

    .write-comment {
      width: 450px;
      margin-left: 88px;
      margin-top: 16px;

      .el-button {
        position: absolute;
        right: 73px;
        height: 73px;
        width: 78px;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    width: 700px;
    margin: 20px auto 0;
  }
}
</style>