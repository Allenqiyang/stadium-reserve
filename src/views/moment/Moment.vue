<template>
  <div class="moment-outer">
    <div class="moment-bg"></div>
    <WriteMoment @momentPublish="MomentDidPublish"/>
    <div v-for="(moment, index) in momentList" :key="moment.id" class="moment-item">
      <div class="avator">
        <img :src="moment.user.avatarUrl ?? require('@/assets' + backupAvatar)" alt="">
      </div>
      <p class="name">{{moment.user.name}}</p>
      <p class="time">{{moment.updateTime.slice(0, 10)}}</p>
      <p class="content" @click="jumpToDetail(moment.id)">{{moment.content}}</p>
      <div class="moment-image" v-if="moment.images">
        <el-image
          v-for="image of moment.images"
          :key="image"
          :src="image"
          :preview-src-list="moment.images"
          :zoom-rate="1.2"
          fit="cover"
        />
      </div>
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

import WriteMoment from './childs/WriteMoment.vue'

import { 
  getMomentList, 
  updateMoment, 
  deleteMoment,
  writeComment,
  getMomentCount,
  getMomentDetail
} from '@/service'

const MomentDidPublish = async () => {
  momentList.value = await getMomentList(0, 8)
}

const backupAvatar = '/images/avatar.png'

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
  await updateMoment(currentEdit.value, updateText.value)
  momentList.value = await getMomentList(0, 8)
}

const confirmDelete = async (momentId) => {
  await deleteMoment(momentId)
  momentList.value = await getMomentList(0, 8)
}

const commentText = ref('')
const isEditCommentShow = ref(Array(8).fill(false))

const confirmPublishComment = async (momentId) => {
  const res = await writeComment(momentId, commentText.value)
  console.log(res)
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
      background-repeat: no-repeat;
      background-size: contain;
      height: 48px;
      width: 48px;
      left: 24px;
      top: 24px;

      img {
        border-radius: 50%;
        height: 48px;
        width: 48px;
      }
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

    .moment-image {
      margin: 10px 50px;
      display: flex;
      align-items: center;
      justify-content: left;
      padding: 0 40px;
      flex-wrap: wrap;

      .el-image {
        width: 100px;
        margin-right: 5px;
      }
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