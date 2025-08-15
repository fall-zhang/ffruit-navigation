<template>
  <dialog  ref="noticeModal" class="modal ">
    <div class="modal-box bg-neutral-100 dark:bg-neutral-800" @click="onClickModal">
      <h3 class="text-lg font-bold flex justify-between">
        跳转提示
      </h3>
      <div class=" flex flex-col justify-center items-center">
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
          <button class="btn rounded-md px-5 py-1.5 mt-3 bg-white dark:bg-neutral-900" @click="onContinue">继续访问</button>
        </form>
      </div>
    </div>
  </dialog>

</template>

<script lang="ts" setup>
import { Target, XIcon } from 'lucide-vue-next'
const modalRef = useTemplateRef('noticeModal')
const dialogVisible = ref(false)
const curURL = ref('')
function showModal (website:string) {
  curURL.value = website
  dialogVisible.value = true
  modalRef.value?.showModal()
}
function onContinue() {
  window.open(curURL.value, '_blank')
  dialogVisible.value = false
  modalRef.value?.close()
}

function onClickModal() {
  onCloseDialog()
}
function onCloseDialog() {
  dialogVisible.value = false
  modalRef.value?.close()
}
defineExpose({
  showModal
})
</script>

<style lang="scss" scoped>

</style>
