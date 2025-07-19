<template>
  <div class="flex justify-center">
    <div class="search-input border border-neutral-300 dark:border-0 rounded-full flex items-center w-100 h-10 text-black">
      <!-- 搜索引擎选择 -->
      <div class="engin-select w-12 px-1 cursor-pointer  h-full flex items-center justify-end hover:bg-neutral-500/30" @click="onChangeEngin">
        <img class="size-6" src="@/assets/official-icon/github.svg" />
        <ChevronRightIcon class="ml-1 rotate-90" :size="10" stroke-width="4" color="#000" />
      </div>
      <input class="no-style-input outline-0 h-full grow" :id="inputId" v-model="inputText" placeholder="">
      <div class="w-16 flex items-center justify-center bg-[#4700f1] h-full cursor-pointer">
        <SearchIcon class="" color="#fff" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ChevronRightIcon, SearchIcon } from 'lucide-vue-next'

function onChangeEngin() {

}
const inputId = useId()
const value2 = ref(dayjs().add(1, 'month').startOf('month'))
const inputText = ref('4646464')
</script>

<style lang="scss" scoped>
.search-input {
  // border: 2px solid transparent;
  outline: none;
  overflow: hidden;
  background-color: #eeeeee;
  transition: all 0.5s;
}

.search-input:hover,
.search-input:focus {
  box-shadow: 0px 0px 0px 6px rgba(74, 150, 236, 0.2), 0px 0px 8px 14px rgba(74, 150, 236, 0.2);
  background-color: #e6e6e6;
}

</style>
