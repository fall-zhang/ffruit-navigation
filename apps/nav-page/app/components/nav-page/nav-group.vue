<template>
  <div class="nav-group ">
    <div class="flex h-8">
      <div class="flex bg-neutral-200/80 backdrop-blur-lg dark:bg-neutral-800 rounded-full">
        <div v-for="group in groupList" class="px-4 flex items-center rounded-full cursor-pointer" :class="activeGroupId === group.id && 'bg-[#4700f1] text-white'" @click="onSelectSubGroup(group)"  :key="group.id">{{group.name}}</div>
      </div>
    </div>
    <NavGroupList class="mt-4" :link-list="currentGroup" />
  </div>
</template>

<script lang="ts" setup>
import NavGroupList from './nav-group-list.vue'
import type { NavDataType } from 'nav-types'
const activeGroupId = ref('')
const activeList = ref<GroupList>()

type GroupList = {
  id:string
  name:string
  navList:NavDataType[]
}

const props = defineProps<{
  groupList: Array<GroupList>
}>()
console.log(props.groupList)


watch(() => props.groupList, () => {
  activeGroupId.value = props.groupList[0]?.id || ''
}, {
  immediate: true
})

const currentGroup = computed(() => {
  if (props.groupList.length > 0) {
    return props.groupList[0]?.navList || []
  }
  return []
})

function onSelectSubGroup(group:GroupList) {
  activeList.value = group
  activeGroupId.value = group.id
}

defineOptions({
  name: 'AppNavList'
})

</script>

<style lang="scss" scoped>

</style>
