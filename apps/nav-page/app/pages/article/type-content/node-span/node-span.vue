<template>
  <template v-if="props.state==='typing'">
    <span class="is-typed">{{typedText}}</span>
    <span class="in-type border-b-2 border-b-neutral-500">{{ inTypeText }}</span>
    <span class="not-type">{{ notTypeText }}</span>
  </template>
  <span v-else :class="{
    'not-type':props.state==='un-type',
    'is-typed':props.state==='typed',
  }">
    {{ props.text }}
  </span>
</template>

<script lang="ts" setup>
import type { TypeUnit } from '../../types'
const props = defineProps<TypeUnit>()
const typedText = ref(props.text)
const notTypeText = ref('')
const inTypeText = ref('')

</script>

<style lang="scss" scoped>
.not-type {
  color: gray;
}
.is-typed{
  color: rgb(63, 237, 63);
}
</style>
