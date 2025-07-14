<template>
  <div class="app-search">
    <el-autocomplete v-model="searchText" :fetch-suggestions="queryData"
      :placeholder="searchGather[searchType]['placeholder']" @select="handleSelect" >
      <template #prefix>
        <SearchIcon :size="16" />
      </template>
      <template #prepend>
        <el-select v-model="searchType" class="search-type-box">
          <el-option label="站内" value="station"></el-option>
          <el-option label="百度" value="baidu"></el-option>
          <el-option label="谷歌" value="google"></el-option>
          <el-option label="360" value="360"></el-option>
          <el-option label="必应" value="bing"></el-option>
          <el-option label="搜狗" value="sogou"></el-option>
        </el-select>
      </template>
    </el-autocomplete>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { SearchIcon } from 'lucide-vue-next'
defineOptions({
  name: 'AppSearch'
})
type GatherItem = {
  name: string
  placeholder: string
  root?: string
}

const searchGather: Record<string, GatherItem> = {
  station: {
    name: '站内',
    placeholder: '站内搜索'
  },
  baidu: {
    name: '百度',
    placeholder: '百度搜索',
    root: 'https://www.baidu.com/s?wd='
  },
  google: {
    name: '谷歌',
    placeholder: '百度搜索',
    root: 'https://www.google.com.hk/search?q='
  },
  '360': {
    name: '360',
    placeholder: '360搜索',
    root: 'https://www.so.com/s?q='
  },
  bing: {
    name: '必应',
    placeholder: '必应搜索',
    root: 'https://cn.bing.com/search?q='
  },
  sogou: {
    name: '搜狗',
    placeholder: '搜狗搜索',
    root: 'https://www.sogou.com/web?query='
  }
}
const searchText = ref()
const searchType = ref('station')
function queryData (query: string, cb: any) {
  if (searchType.value === 'station') {
    queryStation(query, cb)
  } else {
    queryBaidu(query, cb)
  }
}

async function queryStation (query: string, cb: any) {
  if (query !== '') {
    const { data } = await axios.get('/api/nav' + `?keyword=${query}`)
    if (Array.isArray(data.data)) {
      const finalData = data.data.map((item: any) => ({
        ...item,
        value: item.name
      }))
      cb(finalData)
    }
  } else {
    cb([])
  }
}
async function queryBaidu (query: string, cb: any) {
  const res = await axios.get(`/5a1Fazu8AA54nxGko9WTAnF6hhy/su?&wd=${query}&cb=getJSONPData`)

  try {
    const data = eval(res.data)
    const finalData = data.s.reduce((t: any, v: any) => [...t, { value: v }], [])
    cb(finalData)
  } catch (e) {
    cb([])
  }
}
function handleSelect (item: Record<string, any>) {
  const router = useRouter()
  let url = ''
  if (searchType.value === 'station') {
    router.push(`/nav/${item._id}`)
  } else {
    url = searchGather[searchType.value].root + item.value
    window.open(url)
  }
}
</script>

<style lang="scss" scoped>
.app-search {
  display: flex;
  justify-content: center;

  .el-select {
    width: 300px;
  }

  .el-input-group__append,
  .el-input-group__prepend {
    border: 0;
  }

  .el-input__inner {
    border: 0;
    box-shadow: none;
  }

  .search-type-box {
    width: 80px;
  }

  .el-select .el-input.is-focus .el-input__inner {
    border-color: #dfe1e5;
    box-shadow: 0 0 20px rgba(#000, .1);
  }
}

@media screen and (max-width: 568px) {
  .app-search {
    display: none;
  }
}

@media screen and (min-width: 569px) {
  .app-search {
    display: block;
  }
}
</style>
