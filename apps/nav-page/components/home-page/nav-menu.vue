<!-- 左侧系统导航 -->
<template>
  <el-aside class="h-dvh flex flex-col" :width="sideBarWidth">
    <nuxt-link class="title" to="/">
      <img class="w-8 h-8 " src="/favicon.svg" />
      <!-- <span>鲜果导航</span> -->
    </nuxt-link>
    {{ categories }}
    <el-menu :class="props.showMenuType == 'half' ? 'sidebar-half' : 'sidebar-full'" class="el-menu-vertical-demo grow"
      background-color="#4700f1" text-color="#fff" active-text-color="#a27cff" :default-active="defaultActive"
      unique-opened :collapse="isCollapse">
      <el-sub-menu v-for="(item, index) in categories" :key="item._id" :index="item._id" style="text-align: left">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item :index="`${index}-${idx}`" v-for="(nav, idx) in item.children" :key="nav._id"
          @click="handleMenuItemClick(item._id, nav._id)">
          <a>
            <component :is="nav.icon"></component>
          </a>
          <template #title>
            <span>{{ nav.name }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>

    <!-- <div class="sidebar-fix cursor-pointer h-6 w-full bg-pink-50 m-auto pb-3" @click="$emit('showMenus')">
      <el-icon-fold v-if="!isCollapse" />
      <el-icon-unfold v-else />
    </div> -->
  </el-aside>
</template>

<script lang="ts" setup>
import useBaseStore from '@/store/index'
import { BookIcon } from 'lucide-vue-next'
import type { MenuProps, MenuItemProps, SubMenuProps } from 'element-plus'
import type { Component, VueElement } from 'vue'

const sideBarWidth = computed(() => {
  if (props.showMenuType === 'half') {
    return '70px'
  } else if (props.showMenuType === 'all') {
    return '220px'
  }
  return '0'
})
const $route = useRoute()
const $router = useRouter()
const $emit = defineEmits(['subMenuClick', 'showMenus'])
const baseStore = useBaseStore()

type NavItem = {
  _id: string
  name: string
  icon: Component
  children?: NavItem[]
}

const props = withDefaults(defineProps<{
  show: boolean
  categories: NavItem[],
  showMenuType: string
}>(), {
  show: true,
  showMenuType: 'half',
  categories () {
    return []
  }
})

const defaultActive = ref('0-0')
const selectedCategoryId = ref('')

const isCollapse = computed(() => {
  return props.showMenuType === 'half'
})
function handleMenuItemClick (parentId: string, id: string) {
  baseStore.saveSelectedId({
    parentId,
    id
  })

  if ($route.path.includes('/nav')) {
    $router.push('/')
    return
  }
  if (selectedCategoryId.value === parentId) {
    document.getElementById(id)?.scrollIntoView()
    return
  }
  selectedCategoryId.value = parentId
  $emit('subMenuClick', parentId, id)
}
</script>

<style lang="scss" scoped>
$sidebar-w: auto;

.sidebar-fix {
  .item {
    padding: 10px 15px;
    text-align: left;
    cursor: pointer;
    background: #4700f1;

    i {
      font-size: 20px;
      color: #fff;
    }
  }
}

.el-menu {
  border-right: none;
}

.el-aside {
  background-color: #4700f1;
  color: #6b7386;
  text-align: center;
  transition: all 0.5s;

  &.sidebar-half {}

  &.sidebar-full {}


  .el-menu--popup::-webkit-scrollbar,
  .el-menu-vertical-demo.el-menu::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .el-menu--popup::-webkit-scrollbar-thumb,
  .el-menu-vertical-demo.el-menu::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    background: rgba(#4700f1, .2);
  }

  .el-menu--popup::-webkit-scrollbar-track,
  .el-menu-vertical-demo.el-menu::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #4700f1;
  }

  &.aside-hide {
    transform: translateX(-$sidebar-w);
  }

  &.aside-show {
    transform: translateX(0);
  }

  .title {
    font-size: 16px;
    padding: 20px 0;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}

@media screen and (max-width: 568px) {
  .el-aside {
    width: 0;
  }

  .app-search,
  .sidebar-fix {
    display: none;
  }
}

@media screen and (min-width: 569px) {
  .el-aside {
    width: 70px;
  }

  .app-search,
  .sidebar-fix {
    display: block;
  }
}
</style>
