<template>
  <button @click="showModal('http://www.baidu.com')">654654645</button>
  <dialog ref="noticeModal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box p-0">
      <div class="flex justify-between border-b border-b-neutral-600 px-4 py-3">
        <h3 class="font-bold">跳转提示</h3>
        <XIcon  class="cursor-pointer" @click="onCloseDialog"/>
      </div>
      <div class="p-3 flex flex-col justify-center items-center">
        <p class="pt-1.5 text-[15px]">即将离开本站，访问第三方网站</p>
        <a class="pt-1.5 link text-blue-700" :href="curURL" >
          <p>{{ curURL }}</p>
        </a>
        <p class="pt-1.5 text-[15px]">请注意财产安全，详见：免责声明</p>
        <div class="modal-action">
          <div class="text-sm flex items-center">
            下次不再提示
            <input class="ml-2" type="checkbox" />
          </div>
        </div>
      </div>
      <div class="footer pb-4 flex justify-center">
        <form method="dialog">
          <button class="btn" @click="onContinue">继续访问</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { Target, XIcon } from 'lucide-vue-next'
const modalRef = useTemplateRef('noticeModal')

const curURL = ref('')
function showModal (website:string) {
  curURL.value = website
  modalRef.value?.showModal()
}
function onContinue() {
  window.open(curURL.value, '_blank')
  modalRef.value?.close()
}

function onCloseDialog() {
  modalRef.value?.close()
}
defineExpose({
  showModal
})
</script>

<style lang="scss" scoped>

</style>
