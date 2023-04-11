<template>
  <div class="home">
    <div class="carousel">
      <el-carousel height="280px" type="card">
        <el-carousel-item v-for="image in images" :key="image">
          <div>
            <img :src="require(`@/assets/images/${image}.png`)" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="message">
      <div v-for="title of titles" :key="title">
        <div class="message-title">{{title}}</div>
        <div class="notice">
          <div v-for="item of notices" :key="item.id">
            <div class="notice-item">
              <p class="content">> {{item.content}}</p>
              <p class="date">{{item.date}}</p>
            </div>
            <div class="divider"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { notices } from '../../config'

const titles = ['场馆通知', '注意事项', '场馆动态', '其他']
const images = ['badminton', 'basketball', 'football', 'table_tennis']
</script>

<style lang="less" scoped>
.home {
  background-color: #f4f4f5;
  height: 1000px;
  padding-top: 10px;
}

.carousel {
  width: 900px;
  margin: 0 auto;
  img {
    width: 900px;
    height: 280px;
  }
}

.message {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-top: 10px;
  margin: 0 auto;
  width: 1000px;
  .message-title {
    margin-top: 25px;
    height: 30px;
    width: 85px;
    line-height: 30px;
    background-color: #a0cfff;
    text-align: center;
    border-radius: 10px 10px 0 0;
  }
  .notice {
    width: 450px;
    height: 240px;
    border-top: #a0cfff 3px solid;
    border-right: #EBEEF5 1px solid;
    border-left: #EBEEF5 1px solid;
    border-bottom: #EBEEF5 1px solid;
    background-color: #ffffff;
    .notice-item {
      display: flex;
      justify-content: space-evenly;
      &:hover {
        color: #409EFF;
        text-decoration: underline;
      }
      p {
        cursor: pointer;
        font-size: 14px;
        margin: 0;
        padding-top: 20px;
      }
      .content {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 330px;
      }
      .date {
        display: inline-block;
      }
    }
    .divider {
      width: 430px;
      height: 1px;
      margin: 3px auto 0;
      background-color: #c8c9cc;
    }
  }
}
  
</style>