<template>
  <template v-for="(word,index) in props.sentence" :key="index">
    <!-- 练习区域 -->
    <NodeSpan v-bind="word"></NodeSpan>
    <!-- 翻译区域 -->
  </template>
</template>

<script lang="ts" setup>
import type { WordTypeUnit } from '../types'
import NodeSpan from './node-span/node-span.vue'
const props = defineProps<{ sentence:WordTypeUnit[] }>()

</script>

<style lang="scss" scoped>
// 默认输入内容是绿色
</style>
