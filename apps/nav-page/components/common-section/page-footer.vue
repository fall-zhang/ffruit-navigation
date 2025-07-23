<template>
  <div class="h-14  flex flex-col  p-1 text-sm border-t bg-neutral-200/20 border-t-neutral-400 dark:border-t-neutral-500/80  dark:bg-neutral-900/60 backdrop-blur-lg shadow-xl" >
    <div class="relative-group flex  justify-center">
      <div class="relative-item mx-4" v-for="item in relativeList" :key="item.text">
        {{item.text}}
      </div>
    </div>
    <div class="copyright flex justify-center mt-1 ">
      版权所有 © {{ new Date().getFullYear() }} Create By <a class="ml-1" href="https://fallzhang.top" target="_blank"> Fall</a>
    </div>
  </div>
</template>

<script lang="ts" setup>

const relativeList = ref([
  {
    href: '',
    text: '友情链接'
  },
  {
    href: '',
    text: '常见问题'
  },
  {
    href: '',
    text: '友情链接'
  },
  {
    href: '',
    text: '版权'
  },
  {
    href: 'https://',
    text: '联系我们'
  }
])

defineOptions({
  name: 'app-footer'
})
</script>

<style lang="less" scoped>
</style>
