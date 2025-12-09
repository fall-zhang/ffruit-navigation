<template>
  <!-- 用户可能故意输入错误内容 -->
  <template v-if="props.state!=='un-type'">
    <!-- <span class="is-typed">{{typedText}}</span>
    <span class="in-type border-b-2 border-b-neutral-500">{{ inTypeText }}</span>
    <span class="not-type">{{ notTypeText }}</span> -->
    <template v-for="(text,index) in typedWrongList" :key="index">
      <span v-if="text.isInput && text.correct" class="typed-right">{{ text.letter }}</span>
      <span v-else-if="text.isInput"  class="type-wrong">{{ text.letter }}</span>
      <span v-else class="not-type">{{ text.letter }}</span>
    </template>
  </template>
  <span v-else :class="{
    'not-type':props.state==='un-type',
  }">
    {{ props.text }}
  </span>
</template>

<script lang="ts" setup>
import type { WordTypeUnit } from '../../types'
const props = defineProps<WordTypeUnit>()
// 计算获取
const typedWrongList = computed(() => {
  const inputText = props.input || ''
  const inputLength = inputText.length || 0
  const result = props.text.split('').map((letter, index) => {
    const isInput = inputLength > index
    const isTyping = inputLength === index
    return {
      letter,
      isInput,
      isTyping,
      correct: inputText[index] === letter
    }
  })
  return result
})
</script>

<style lang="scss" scoped>
.not-type {
  color: gray;
}
.typed-right{
  color: rgb(63, 237, 63);
}
.type-wrong{
  color: rgb(237, 63, 63);
  border-bottom: 2px solid rgb(237, 63, 63);
}
</style>
