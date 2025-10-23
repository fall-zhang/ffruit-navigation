<!-- 用于查询该用户是否为鼠鼠 -->

<template>
  <div class="app-search flex  h-8 overflow-hidden rounded-lg">
    <div class="flex w-2 items-center justify-center  dark:bg-neutral-600 dark:text-white bg-white text-neutral-900">
    </div>
    <input type="text" class="w-full h-full max-w-[160px] bg-white dark:bg-neutral-600 dark:text-white pl-2 text-neutral-900 text-base  outline-0" placeholder="搜索" >
    <!-- <input type="button" value="Search" class="bg-blue-500 px-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"> -->
    <div class="flex w-10 items-center justify-center  bg-white dark:bg-neutral-600 dark:text-white text-neutral-900" @click="onSearchShuShu" @keydown=" onSearchShuShu">
      <SearchIcon :size="16" />
    </div>
    <template v-if="verifyRes">
      <div class="flex" :class="{
        'bg-green-600':verifyRes.type === '鼠鼠',
        'bg-red-600':verifyRes.type === '背刺',
        'bg-gray-600':verifyRes.type === '无信息'
      }">
        <div class="text-sm">鉴定结果</div>
        <div class="text-4xl text">
          {{ verifyRes.type }}
        </div>
        <div class="tag-time">
          被标记为鼠鼠：{{ verifyRes.shuBabyMarks }}次
        </div>
        <div class="tag-time">
          被标记为背刺：{{ verifyRes.shuBabyMarks }}次
        </div>
        <div class="set-new-type">
          <div class="">
            鼠鼠
          </div>
          <div class="">
            背刺
          </div>
        </div>
      </div>
    </template>
    <div>
      fool me once shame on you, fool me twice shame on me.
      欺骗可耻，再次被骗，我同样可耻。
    </div>
    <div>
      如果每个人都有钱打猛攻，也就不存在鼠鼠了
    </div>
    <div>
      如果策划当人，撤离失败，也有机会从头再来，努努力就能实现财富自由
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SearchIcon } from 'lucide-vue-next'
defineOptions({
  name: 'AppSearch'
})
const inputName = ref('')

const verifyRes = ref<{
  id:number
  type:'鼠鼠' | '背刺' | '无信息',
  shuBabyMarks:number
  csMarks:number
  isAdminMark:boolean
} | null>(null)
function onSearchShuShu() {

}
/**
 * 设置为鼠鼠，或者猛攻
 */
function onUserSetType(type:'鼠鼠' | '背刺') {
  if (!verifyRes.value) {
    return
  }
  if (verifyRes.value.id) {
    $fetch('/api/shushu/statistics', {
      method: 'post',
      body: {
        type
      }
    }).then(res => {
      console.log(res)
      ElMessage.success('添加成功')
    }).catch(err => {
      console.warn(err)
    })
    ElMessage.success('添加成功')
  }
}
// 给出查询用时

</script>

<style lang="scss" scoped>

</style>
