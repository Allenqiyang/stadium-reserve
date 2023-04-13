<template>
  <div class="detail-outer">
    <div class="bg"></div>
    <el-button @click="backToMoments" link class="back-moment">&lt; 返回</el-button>
    <UpdateMoment 
      :isUpdateShow="isUpdateShow" :momentId="momentDetail.id" 
      @close-update="closeUpdate" @update-success="updateSuccess"
    />
    <div class="moment-detail">
      <div class="avatar">
        <img :src="momentDetail.user.avatarUrl ?? backupAvatar" alt="">
      </div>
      <p class="name">{{momentDetail.user.name}}</p>
      <p class="time">{{momentDetail.updateTime.slice(0, 10)}}</p>
      <p class="content">{{momentDetail.content}}</p>
      <div class="moment-image" v-if="momentDetail.images">
        <el-image
          v-for="image of momentDetail.images"
          :key="image"
          :src="image"
          :preview-src-list="momentDetail.images"
          :zoom-rate="1.2"
          fit="cover"
        />
      </div>
      <div class="btns">
        <el-button type="primary" icon="Edit" @click="isUpdateShow = true"></el-button>
        <el-popconfirm title="要删除这条动态吗?" @confirm="confirmDelete(momentDetail.id)">
          <template #reference>
            <el-button type="danger" icon="Delete"/>
          </template>
        </el-popconfirm>
      </div>
      <div class="write-comment">
        <el-input 
          v-model="commentText"
          rows="3"
          type="textarea"
          resize="none"
          placeholder="发一条友善的评论"
        />
        <el-button 
          @click="confirmPublishComment(momentDetail.id)" 
          type="primary">发表评论</el-button>
      </div>
      <div class="show-comment">
        <div v-for="comment in commentList" :key="comment.id" class="comment-detail">
          <div class="comment-divider"></div>
          <div class="c-avatar">
            <img :src="comment.user.avatarUrl ?? backupAvatar" alt="">
          </div>
          <p class="name">{{comment.user.name}}</p>
          <p class="time">{{comment.updateTime.slice(0, 10)}}</p>
          <p class="content">{{comment.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useMomentStore } from '../../store'
import { getComment, writeComment } from '../../service'
import UpdateMoment from './childs/UpdateMoment.vue'

const router = useRouter()
const backToMoments = () => {
  router.push('/moment')
}

const store = useMomentStore()
const { momentDetail } = storeToRefs(store)

const backupAvatar = require('@/assets/images/avatar.png')

const isUpdateShow = ref(false)
const closeUpdate = () => {
  isUpdateShow.value = false
}
const updateSuccess = () => {
  store.storeMomentDetail(momentDetail.value.id)
}

const commentList = ref([])
onMounted(async () => {
  commentList.value = await getComment(momentDetail.value.id)
})

const confirmDelete = async (momentId) => {
  await deleteMoment(momentId)
  router.push('/moment')
}

const commentText = ref('')
const confirmPublishComment = async (momentId) => {
  await writeComment(momentId, commentText.value)
  commentText.value = ''
  commentList.value = await getComment(momentId)
}

</script>

<style lang="less" scoped>
.detail-outer {
  padding-top: 5px;
  .back-moment {
    margin-left: 290px;
  }

  .bg {
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

  .moment-detail {
    border-radius: 10px;
    background-color: rgb(246, 255, 255);
    width: 700px;
    margin: 10px auto 0;
    padding-top: 16px;
    padding-bottom: 20px;
    position: relative;

    .avatar {
      position: absolute;
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

    .show-comment {
      .comment-detail {
        position: relative;
        padding-top: 5px;
        .comment-divider {
          background-color: #c5c9cd;
          width: 600px;
          height: 1px;
          margin: 0 auto;
        }
      }
      .c-avatar {
        position: absolute;
        height: 35px;
        width: 35px;
        left: 44px;
        top: 22px;

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>