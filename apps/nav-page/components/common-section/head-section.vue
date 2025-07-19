<template>
  <div class="h-16 items-center px-6 flex bg-neutral-200 dark:bg-neutral-800 shadow-xl justify-between w-full border-b-neutral-500 border-b">
    <div class="hidden sm:flex ">
      <nuxt-link to="/" class="flex items-center">
        <OrangeIcon  :size="36"/>
        <h1 class="text-2xl mr-4 text-(--text-primary) font-bold">鲜果导航</h1>
      </nuxt-link>
      <AppSearch />
    </div>
    <div class="grow"></div>
    <div class="dropdown dropdown-hover dropdown-bottom dropdown-end">
      <div tabindex="0" role="button" class="    m-1  mr-2 p-1 rounded cursor-pointer hover:bg-neutral-200/30">
        <ImageIcon class="" height="26"  width="26"/>
      </div>
      <!-- <div >Hover</div> -->
      <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>

    <ThemeSwitch />
    <i class="el-icon-menu" @click="$emit('handleShowMenu')"></i>
  </div>
</template>

<script lang="ts" setup>
import { ImageIcon, PictureInPictureIcon, PlusIcon } from 'lucide-vue-next'
import AppSearch from '../NavSearch.vue'
import { OrangeIcon } from '../icon/orange-icon'

</script>

<style lang="scss" scoped>
.button-item {
  margin-left: 10px;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0px 1px 6px rgba(#000, .1);

  .arrow {
    flex: 1;
    cursor: pointer;
  }

  .arrow i {
    color: #999;
    font-size: 24px;
  }

  i {
    font-size: 25px;
    margin-left: 2rem;
    color: #999;
    cursor: pointer;
  }

  .header-logo {
    width: 150px;
    // filter: invert(1);
  }
}
</style>
