<template>
  <template v-for="(section,index) in props.article.sections" :key="index">
    <!-- 练习区域 -->

    <!-- 翻译区域 -->
  </template>
</template>

<script lang="ts" setup>
import type { ArticleType } from '../types'
import NodeSpan from './node-span/node-span.vue'
const props = defineProps<{ article:ArticleType }>()

</script>

<style lang="scss" scoped>
// 默认输入内容是绿色
</style>
