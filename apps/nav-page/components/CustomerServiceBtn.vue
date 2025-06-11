<template>
  <div class="customer-service-btn">
    <el-dropdown @command="handleCommand">
      <span class="feedback">
        <MessageCircleQuestion />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="show-log">更新日志</el-dropdown-item>
          <el-dropdown-item command="feedback">意见反馈</el-dropdown-item>
          <el-dropdown-item command="contact">联系我们</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { MessageCircleQuestion } from 'lucide-vue-next'
const emit = defineEmits(['showLog'])
function handleCommand(command: string) {
  if (command === 'feedback') {
    window.open('https://support.qq.com/product/330737')
  } else if (command === 'contact') {
    window.open('https://geekape.net/about')
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
