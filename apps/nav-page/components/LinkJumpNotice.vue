<template>
  <ElDialog v-model="dialogVisible"  modal title="跳转提示" class="fixed">
    <div class=" p-0">
      <!-- <div class="flex justify-between border-b border-b-neutral-600 px-4 py-3">
        <h3 class="font-bold"></h3>
        <XIcon  class="cursor-pointer" @click="onCloseDialog"/>
      </div> -->
      <div class="p-0 flex flex-col justify-center items-center">
        <p class="pt-1.5 text-base">即将离开本站，访问第三方网站</p>
        <a class="pt-1.5 link text-[#9e77f8]" :href="curURL" >
          <p>{{ curURL }}</p>
        </a>
        <p class="pt-1.5 text-xs">请注意财产安全，详见：免责声明</p>
        <div class="modal-action ">
          <div class=" flex items-center  text-xs">
            下次不再提示
            <input class="ml-2" type="checkbox" />
          </div>
        </div>
      </div>
      <div class="footer pb-4 flex justify-center">
        <form method="dialog">
          <el-button class="bg-blue-600 px-5 py-1.5 mt-3 rounded" @click="onContinue">继续访问</el-button>
        </form>
      </div>
    </div>
  </ElDialog>

</template>

<script lang="ts" setup>
import { Target, XIcon } from 'lucide-vue-next'
// const modalRef = useTemplateRef('noticeModal')
const dialogVisible = ref(false)
const curURL = ref('')
function showModal (website:string) {
  curURL.value = website
  dialogVisible.value = true
  // modalRef.value?.showModal()
}
function onContinue() {
  window.open(curURL.value, '_blank')
  dialogVisible.value = false
  // modalRef.value?.close()
}

function onCloseDialog() {
  dialogVisible.value = false
  // modalRef.value?.close()
}
defineExpose({
  showModal
})
</script>

<style lang="scss" scoped>

</style>
