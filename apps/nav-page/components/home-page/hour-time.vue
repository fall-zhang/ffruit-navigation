<template>
  <div class="">
    <span class="flex flex-col items-center gap-1" >
      <div class=" text-justify real-time text-6xl">
        {{ formattedTime }}
      </div>
      <span class="">
        {{ formattedDay }}
      </span>
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

defineExpose({
})
</script>
