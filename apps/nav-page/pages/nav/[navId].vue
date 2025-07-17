<template>
  <div class="container flex">
    <div class="web-icon p-4 bg-white dark:bg-neutral-700 rounded-4xl size-40 shadow">
      <div class="img-wrap">
        <nuxt-link to="/">
          <el-image :src="detail.logo" alt="失败" />
        </nuxt-link>
      </div>
      <div class="tool flex h-6">
        <el-tooltip content="访问数" placement="top">
          <div class="tool-item">
            <UserIcon />
            <p>{{ detail.view }}</p>
          </div>
        </el-tooltip>
        <div style="width: 30px"></div>
        <el-tooltip content="点赞数" placement="top">
          <div :class="`tool-item ${isUserStar && 'active'}`" @click="handleNavStarFn">
            <p>{{ detail.star }}</p>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="content">
      <h1 class="title">{{ detail.name }}</h1>
      <p class="desc">{{ detail.desc }}</p>
      <p class="tags" v-if="detail.tags">标签：
        <span v-for="(tag, index) in detail.tags" :key="tag">{{ index != 0 ? '，' : '' }}{{ tag }}</span>
      </p>
      <p class="author" v-if="detail.creator">
        <span class="el-icon-user-solid"></span>
        <FileIcon />
        <span>创建人：</span>
        <a :href="detail.creatorUrl">{{ detail.creator }}</a>
      </p>
      <div class="btn-group">
        <div @click="handleNavClick(detail)" target="_blank" class="btn-link btn-group-item">
          链接直达
          <LinkIcon />
        </div>
        <!-- <div class="btn-moblie btn-group-item">
          手机查看
          <ScanQrCodeIcon />
        </div>-->
      </div>
    </div>
    <div class="right">
      <div class="app-card">
        <div class="app-card-header">
          <h3 class="app-card-title">随机网址</h3>
          <div class="app-card-extra">
            <RotateCcwIcon @click="getRandomNavList"/>
          </div>
        </div>
        <div class="app-card-content" v-for="item in randomNavList" :key="item.id">
          <nuxt-link class="nav-block" :to="`/nav/${item.id}`">
            <img :src="item.logo" alt="" class="nav-logo">
            <h4 class="nav-name">{{ item.name }}</h4>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="detail">{{ detail.desc }}</div>
    <aside></aside>
  </div>
</template>

<script lang="ts" setup>
import type { LinkItem } from '@/types/global'
import axios from 'axios'
import { FileIcon, LinkIcon, RotateCcwIcon, UserIcon } from 'lucide-vue-next'
// import { API_NAV, API_NAV_RANDOM } from '../../api'
const route = useRoute()
console.log(route)
route.params.navId
defineOptions({
  name: 'SiteDetail'
})

const isUserStar = ref(false)

const detail = ref<LinkItem>({
  logo: '',
  view: 0,
  star: 0,
  name: '',
  desc: '',
  tags: [],
  creator: '',
  creatorUrl: '',
  href: '',
  id: '',
  createTime: ''
})
const randomNavList = ref<LinkItem[]>([])
async function getRandomNavList () {
  const res = await axios.get('/api/nav/random')
  randomNavList.value = res.data
}
async function handleNavStarFn () {
  let { star, id } = detail.value

  const stars = localStorage.get('STARS') || {}
  if (stars[id]) return

  star++
  await axios.put('/api/nav', { id, star })
  isUserStar.value = true
  detail.value.star += 1
  stars[id] = star
  localStorage.set('STARS', stars)
}

async function handleNavClick (navData:LinkItem) {
  const { href } = navData
  const { view, id } = navData

  await axios.put('/api/nav', { id, view: view + 1 })

  const views = localStorage.get('VIEWS') || {}
  views[id] = view + 1
  localStorage.set('VIEWS', views)
  window.open(href, '_blank')
}

</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 3rem 15px;
}

.placeholder {
  min-height: 300px;
}

.site-info {
  font-size: 14px;
  margin-top: 50px;

  .left {


    .img-wrap {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .el-image {
      margin-bottom: 50px;
      width: 100px;
      height: 100px;
      object-fit: cover;

      img {
        width: 100%;
      }
    }

    .tool {
      display: flex;
      &-item {
        background: #f0f1f4;
        font-size: 12px;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        box-shadow: 0 0 20px rgba(#000, .12);
        color: #999;

        &.active {
          color: #4700f1;
        }
      }
    }
  }

  .category {
    padding: 2px;
    background: #f1404b;
    color: #fff;
    font-size: 10px;
    border-radius: 2px;

    &-bar {
      color: #f1404b;
    }
  }

  .title {
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: bold;
    color: #000;
  }

  .desc {
    font-size: 16px;
    margin-bottom: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .btn-group {
    display: flex;

    &-item {
      background: #e9e9e9;
      color: #666;
      padding: 10px 20px;
      margin-right: 15px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      transition: all .3s;
      cursor: pointer;

      &:hover {
        background: #000;
      }
    }
  }
}

.site-detail {
  margin-top: 300px;
  font-size: 16px;
}

.background-fx {
  position: absolute;
  left: 60px;
  right: 0;
  height: 100vh;
  top: 0;
  overflow: hidden;
  opacity: 1;
  z-index: -1;
}

.app-card {
  border: 2px solid #eee;
  background: #f9f9f9;

  .app-card-header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .app-card-title {
    margin: 0;
  }

  .app-card-content {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    padding-top: 0;

    .nav-block {
      margin-bottom: 10px;
    }
  }
}

.nav-block {
  display: flex;
  align-items: center;
  padding: 5px;
  background: #f1f3f6;
  border: 1px solid transparent;
  color: #666;

  &:hover {
    opacity: .8;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  .nav-name {
    margin: 0;
  }
}

</style>
