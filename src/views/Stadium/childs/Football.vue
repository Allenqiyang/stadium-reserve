<template>
  <div class="football">
    <div class="foot-court"></div>
    <p>梅林文体中心足球场</p>
    <p>场馆介绍：</p>
    <p>国际标准的足球场，采用人造草地球场(全场材质符合环保要求)，一年四季都能带给你春天的感觉</p>
    <p>草坪良好的弹性让你在活动时脚感舒适，配有足球场专用照明灯</p>
    <p>采用4根高26米立杆，每根立杆有中宽光束金属卤化物照明灯具14套</p>
    <p>聚光束金属卤化物照明灯具4套，水平照度达611.3 LUX，使夜间比赛光线充足、均匀。每天安排8场</p>
    <p>具体时间根据实际情况而定，客人需提前订场</p>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.football {
  border: 1px #E4E7ED solid;
  margin-left: 300px;
  width: 800px;
  top: 120px;
  left: 300px;
  padding-top: 20px;
  text-align: center;

  .foot-court {
    background-image: url("@/assets/images/football.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 409px;
    height: 256px;
    margin: 0 auto;
  }
}
</style>