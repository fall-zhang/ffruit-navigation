<template>
  <el-dropdown @command="handleCommand">
    <div class="customer-service-btn">
      <MessageCircleQuestion class="text-white" />
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
import { useRouter } from 'vue-router'
const emit = defineEmits(['showLog'])
const router = useRouter()
function handleCommand(command: string) {
  if (command === 'feedback') {
    // feedbackDialog
    // console.log('打开 feedback 弹窗')
    router.push('/feedback')
  } else if (command === 'contact') {
    window.open('https://fallzhang.top')
  } else if (command === 'show-log') {
    emit('showLog', true)
  }
}
</script>

<style lang="scss" scoped>
.customer-service-btn {
  width: 48px;
  height: 48px;
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
}
</style>
