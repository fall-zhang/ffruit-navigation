<!-- 通过导入，获取 JSON 文件，支持文件修复
  支持粘贴 JSON 文件

-->
<template>
  <div class="flex gap-4 h-full">
    <button class="btn">导入文件</button>
    <div class="flex border rounded-md h-full flex-col w-100 px-2 py-4 bg-neutral-900 dark:border-neutral-700 mx-4 my-4">
      <div class="trans-item items-center mb-1" v-for="item in plainTransList" :key="item.key">
        <div class="text-xs w-28">
          {{ item.key }} :
        </div>
        <input class="input input-neutral ml-8 input-sm" v-model="item.value">
      </div>
    </div>
    <div class="flex border rounded-md h-full flex-col w-100 px-2 py-4 bg-neutral-900 dark:border-neutral-700 mx-4 my-4">
      <div class="trans-item items-center mb-1" v-for="item in targetTransList" :key="item.key">
        <div class="text-xs w-28">
          {{ item.key }} :
        </div>
        <input class="input input-neutral ml-8 input-sm outline-0" v-model="item.value">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'es-toolkit'
defineOptions({
  name: 'TranslatePage'
})

const translateJSON = ref('')

type TransItem = {
  key:string
  value:string
}

const plainTransList = ref<TransItem[]>([])
const targetTransList = ref<TransItem[]>([])
const transObj = ref({
  name: '刘向东',
  info: {
    system: '系统',
    login: '登录'
  }
})

// onMounted(() => {
plainTransList.value = transObjToArr(transObj.value)
targetTransList.value = getTargetTransList(plainTransList.value)
// })

function parseJSONFile(text:string) {

}

type TransJSONFile = Record<string, string | Record<string, string | Record<string, string>>>

/**
 * 将对象转换为数组
 * @param obj
 * @param prefix 父对象传递的 key
 */
function transObjToArr(obj:TransJSONFile, prefix?:string):TransItem[] {
  const result:TransItem[] = []
  Object.keys(obj).forEach((item:string) => {
    if (typeof obj[item] === 'string') {
      const transKey = prefix ? prefix + '.' + item : item
      result.push({
        key: transKey,
        value: obj[item]
      })
    } else {
      const transKey = prefix ? prefix + '.' + item : item
      const res = transObjToArr(obj[item]!, transKey)
      res.forEach(item => {
        result.push(item)
      })
    }
  })
  return result
}
/**
 * 获取用户编写的列表
 */
function getTargetTransList(transList:TransItem[]):TransItem[] {
  // const map = new Map()
  // map.set('')
  const newList = transList.map(item => {
    return {
      ...item,
      value: ''
    }
  })
  return newList
}

function diffObject() {

}
</script>

<style lang="scss" scoped>

</style>
