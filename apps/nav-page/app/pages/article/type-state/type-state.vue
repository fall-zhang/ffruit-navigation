<!-- 当前编辑的状态 -->
<template>
  <div class="stats-container">
    <div class="stat-box">
      <div class="stat-value">{{accuracy}}%</div>
      <div class="stat-label">准确率</div>
    </div>
    <div class="stat-box">
      <div class="stat-value" >{{error}}</div>
      <div class="stat-label">错误数</div>
    </div>
    <div class="stat-box">
      <div class="stat-value" >{{totalTyped}}</div>
      <div class="stat-label">已输入字符</div>
    </div>
    <div class="stat-box">
      <div class="stat-value" >{{time}}s</div>
      <div class="stat-label">用时</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  accuracy:number,
  error:number
  totalTyped:number
  time:number
  endTime:number
}>()


</script>

<style lang="scss" scoped>

</style>
