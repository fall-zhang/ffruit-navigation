<template>
  <div class="">
    <span class="text-4xl" >
      {{ formattedTime }}
      {{ formattedDay }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useDateFormat, useNow, useTimeAgo } from '@vueuse/core'
import { computed } from 'vue'

defineOptions({
  name: 'ElStatistic'
})
const formattedTime = useDateFormat(useNow(), 'HH:mm')
const formattedDay = useDateFormat(useNow(), 'YYYY 年 M 月 D 日')
const props = defineProps({

})
useTimeAgo

defineExpose({
})
</script>
