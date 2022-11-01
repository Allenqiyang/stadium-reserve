<template>
  <div class="basketball">
    <div class="bask-court"></div>
    <p>球场名字：深圳湾体育中心篮球场</p>
    <p>球场位置：深圳湾体育中心</p>
    <p>球场营业时间：早上9点-晚上10点</p>
    <p>球场经营的运动项目：篮球、足球、羽毛球、网球、游泳、瑜伽</p>
    <p>每个项目的场地数量：篮球9个全场</p>
    <p>球场地板：采用硅PU弹性面层，使得篮球运动更加舒适、更加安全</p>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.basketball {
  border: 1px #E4E7ED solid;
  margin-left: 300px;
  width: 800px;
  top: 120px;
  left: 300px;
  padding-top: 20px;
  text-align: center;

  .bask-court {
    background-image: url("../assets/images/basketball.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 400px;
    height: 300px;
    margin: 0 auto;
  }
}
</style>