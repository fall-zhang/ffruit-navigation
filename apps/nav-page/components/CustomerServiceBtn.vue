<template>
  <el-dropdown @command="handleCommand">
    <div class="customer-service-btn">
      <span class="feedback">
        <MessageCircleQuestion />
      </span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="show-log">更新日志</el-dropdown-item>
        <el-dropdown-item command="feedback">意见反馈</el-dropdown-item>
        <el-dropdown-item command="contact">联系我们</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

</template>

<script lang="ts" setup>
import { MessageCircleQuestion } from 'lucide-vue-next'
const emit = defineEmits(['showLog'])
function handleCommand(command: string) {
  if (command === 'feedback') {
    // feedbackDialog
    console.log('打开 feedback 弹窗')

  } else if (command === 'contact') {
    window.open('https://fallzhang.top')
  } else if (command === 'show-log') {
    emit('showLog', true)
  }
}
</script>

<style lang="scss" scoped>
.feedback {
  color: white;
  outline: none;
}

.customer-service-btn {
  width: 60px;
  height: 60px;
  background: #4700f1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  cursor: pointer;
  right: 50px;
  bottom: 50px;
  box-shadow: 0 0 20px rgba(#4700f1, .4);

  i {
    color: #fff;
    margin-left: 0;
    font-size: 30px;
  }
}
</style>
