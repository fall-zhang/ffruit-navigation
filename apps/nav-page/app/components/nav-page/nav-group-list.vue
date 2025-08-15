<!-- 对于desc 描述过长的内容, hover 时展示 tooltip -->

<template>
  <div class="grid w-full lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
    <div class="info-card h-24 flex items-center dark:text-neutral-200 text-neutral-900 mb-5 rounded-md p-2 border border-neutral-300 overflow-hidden cursor-pointer text-xs hover:shadow-sm dark:shadow-xl dark:hover:shadow-neutral-300 bg-neutral-200/70 dark:bg-neutral-800/70 dark:border-neutral-700 backdrop-blur-xl"  v-for="navItem in linkList" :key="navItem.id" @click="onClickNavLink(navItem)" >
      <ClientOnly>
        <div class="flex px-2.5 grow items-center" >
          <img class="rounded-full w-10 h-10 shrink-0" :src="getLinkIcon(navItem)" fit="cover" />
          <div class="ml-2">
            <strong class="text-base text-[#3273dc] w-full overflow-ellipsis overflow-hidden">{{ navItem.name }}</strong>
            <div class="mt-1">
              {{ navItem.desc || "这个网站什么描述也没有..." }}
            </div>
          </div>
        </div>
      </ClientOnly>
      <div class="border-t-neutral-100 dark:border-t-neutral-900 ">
        <!-- <div class="text-sm  flex items-center" >
          <a :href="navItem.creatorUrl" target="_blank">
            <span>{{ navItem.creator }}</span>
          </a>
        </div>
        <div class="flex grow">
          <span class="flex items-center" :class="isView && 'active'">
            <EyeIcon/>
            {{ navItem.view }}
          </span>
          <span
            class="flex items-center"
            :class="isStar && 'active'"
            @click="handleNavStar(navItem)"
          >
            <StarIcon/>
            {{ navItem.star }}
          </span>
        </div> -->
      </div>
      <div class="flex justify-end mr-4" target="_blank" @click="handleNavClick(navItem)">
        <el-tooltip content="链接直达" property="top">
          <LinkIcon />
        </el-tooltip>
      </div>
    </div>
    <LinkJumpNotice ref="jumpNotice" @entry="onEntryLink" />
  </div>
</template>

<script lang="ts" setup>
import { LinkIcon, EyeIcon, StarIcon } from 'lucide-vue-next'
import useBaseStore from '@/store'
import type { NavDataType } from 'nav-types'
const props = defineProps<{
  linkList: Array<NavDataType>
}>()

const jumpNoticeRef = useTemplateRef('jumpNotice')
const baseStore = useBaseStore()
async function addNavView(navData:NavDataType) {
  const { view, id } = navData
  await useFetch('/api/nav', {
    method: 'PUT',
    body: { id, view: view + 1 }
  })

  const views = getLocal('VIEWS')
  views[id] = view + 1
  localStorage.set('VIEWS', views)
}
function handleNavClick(navData:NavDataType) {
  const { href } = navData
  addNavView(navData)
  window.open(href, '_blank')
}

function onEntryLink(link:string) {
  window.open(link, '_blank')
}
function onClickNavLink(navItem:NavDataType) {
  console.log('baseStore.showJumpNotice', baseStore.showJumpNotice)
  if (baseStore.showJumpNotice) {
    jumpNoticeRef.value?.showModal(navItem.href)
  } else {
    // window.open(navItem.href, '_blank')
  }
}

function getLinkIcon(navItem:NavDataType) {
  if (navItem.logo) {
    return navItem.logo
  }
  const url = new URL(navItem.href)
  return url.origin + '/favicon.ico'
}

defineOptions({
  name: 'AppNavList'
})

</script>

<style lang="scss" scoped>
.info-card {
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 26px 40px -24px rgba(#000, .2);
    transition: all 0.3s ease;
  }
  .info-header {
    display: flex;
    align-items: center;
    overflow: auto;

    .info-right {
      display: flex;
      flex-direction: column;
    }
  }
}

.web-logo {
  min-width: 35px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 15px;
}
</style>
