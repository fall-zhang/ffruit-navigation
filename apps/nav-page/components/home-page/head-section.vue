<template>
  <div class="h-16 items-center px-6 flex justify-between w-full border-b-neutral-500 border-b">
    <div class="hidden sm:flex ">
      <nuxt-link to="/">
        <!-- <img class="header-logo" src="/logo-nav.png" /> -->
        <h1 class="text-2xl mr-4">鲜果导航</h1>
      </nuxt-link>
      <AppSearch />
    </div>
    <div class="grow"></div>
    <el-tooltip content="推荐网站">
      <nuxt-link to="/recommend">
        <PlusIcon />
      </nuxt-link>
    </el-tooltip>
    <ThemeSwitch />
    <i class="el-icon-menu" @click="$emit('handleShowMenu')"></i>
  </div>
</template>

<script lang="ts" setup>
import { PlusIcon } from 'lucide-vue-next'
import AppSearch from '../NavSearch.vue'

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
