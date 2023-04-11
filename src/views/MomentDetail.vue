<template>
  <div class="detail-outer">
    <div class="bg"></div>
    <el-button @click="backToMoments" link class="back-moment">&lt; 返回</el-button>
    <div class="moment-detail">
      <div class="avator"></div>
      <p class="name">{{store.momentDetail.user.name}}</p>
      <p class="time">{{store.momentDetail.updateTime.slice(0, 10)}}</p>
      <p class="content">{{store.momentDetail.content}}</p>
      <div class="btns">
        <el-button icon="ChatRound"></el-button>
        <el-popconfirm title="要删除这条动态吗?" @confirm="confirmDelete(store.momentDetail.id)">
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
          @click="confirmPublishComment(store.momentDetail.id)" 
          type="primary">发表评论</el-button>
      </div>
      <div class="show-comment">
        <div v-for="comment in commentList" :key="comment.id" class="comment-detail">
          <div class="comment-divider"></div>
          <div class="c-avator"></div>
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
import { useMomentStore } from '../store'
import { getComment, writeComment } from '../service'

const router = useRouter()
const backToMoments = () => {
  router.push('/moment')
}

const store = useMomentStore()

const commentList = ref([])
onMounted(async () => {
  commentList.value = await getComment(store.momentDetail.id)
})

// {
//   commentId: null
//   content: "确实不错"
//   createTime: "2022-10-21T04:22:42.000Z"
//   id: 3
//   updateTime: "2022-10-21T04:22:42.000Z"
//   user: {
//     id: 3
//     name: "Rose"
//   }
// }

const confirmDelete = async (momentId) => {
  deleteMoment(momentId)
  router.push('/moment')
}

const commentText = ref('')
const confirmPublishComment = (momentId) => {
  writeComment(momentId, commentText.value)
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
      .c-avator {
        position: absolute;
        background-image: url('@/assets/images/avatar.png');
        background-repeat: no-repeat;
        background-size: contain;
        border-radius: 50%;
        height: 35px;
        width: 35px;
        left: 44px;
        top: 22px;
      }
    }
  }
}
</style>