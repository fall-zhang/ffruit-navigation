<template>
  <div class="flex">
    <!-- 搜索引擎选择 -->
    <el-countdown format="DD [days] HH:mm:ss" :value="value2">
      <template #title>
        <div style="display: inline-flex; align-items: center">
          <el-icon style="margin-right: 4px" :size="12">
            <Calendar />
          </el-icon>
          Still to go until next month
        </div>
      </template>
    </el-countdown>
    <input v-model="inputText" type="text">
    <SearchIcon />
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { SearchIcon } from 'lucide-vue-next'
const value2 = ref(dayjs().add(1, 'month').startOf('month'))
const inputText = ref('')
</script>

<style lang="scss" scoped>

</style>
