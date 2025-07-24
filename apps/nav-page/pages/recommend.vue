<template>
  <div class=" flex justify-center my-6 h-full ">
    <div class="py-8 rounded-3xl bg-neutral-100/70 dark:bg-neutral-700/70 h-full xl:w-1/2 sm:w-3/4 lg:w-2/3 flex justify-center backdrop-blur-2xl px-4">
      <el-form class="min-w-100 w-2/3" ref="ruleForm" label-width="100px" :model="form" :rules="rules" v-loading="formLoading">
        <el-form-item label="网站链接" prop="href">
          <el-input placeholder="http://www.baidu.com/" v-model="form.href" :disabled="form.id === 'update'"
            @blur="getNavInfo" />
          <!-- <span style="color: red">输入链接自动爬取信息</span> -->
        </el-form-item>

        <el-form-item label="网站标签" prop="tags">
          <el-select v-model="form.tags" multiple :multiple-limit="5" filterable allow-create default-first-option
            placeholder="输入网站标签，最多5个">
            <el-option v-for="item in tagList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站名称" prop="name">
          <el-input placeholder="输入网站名称" v-model="form.name" />
        </el-form-item>
        <!-- <el-form-item label="网站logo" prop="logo">
          <el-input placeholder="输入网站logo" v-model="form.logo" />
          <img style="max-width: 30px;" :src="form.logo" />
        </el-form-item> -->
        <el-form-item label="网站描述" prop="desc">
          <el-input placeholder="简要描述网站，尽量在 20 个字以内" v-model="form.desc" />
        </el-form-item>
        <el-form-item label="网站分类" prop="categoryId">
          <el-cascader :options="webCategories" v-model="form.categoryId" placeholder="请选择" filterable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="推荐人名称" prop="authorName">
          <el-input  v-model="form.authorName" />
        </el-form-item>
        <el-form-item label="推荐人网站" prop="authorUrl">
          <el-input placeholder="填写你要推广的链接" v-model="form.authorUrl" />
        </el-form-item>
        <el-form-item label="网站详情" prop="detail">
          <el-input type="textarea" placeholder="输入网站详情" v-model="form.detail" />
        </el-form-item>
        <div class="flex justify-center">
          <el-button type="primary" :loading="submitLoading" @click="onAddNav()">
            提交
          </el-button>
        </div>
      </el-form>
    </div>
    <LinkNotice />
  </div>

</template>

<script lang="ts" setup>
import axios from 'axios'
import type { CascaderOption, FormRules } from 'element-plus'
import { API_NAV, API_NAV_REPTILE, API_TAG_LIST } from '@/server/api'
import { ElMessage } from 'element-plus'
import LinkNotice from '@/components/LinkJumpNotice.vue'
defineOptions({
  name: 'recommend-page'
})
const $emit = defineEmits(['update:show', 'submit'])
const formRef = useTemplateRef('ruleForm')
const submitLoading = ref(false)
const formLoading = ref(false)


const webCategories = ref<CascaderOption[]>([])
const tagList = ref<Array<{
  label:string
  value:string
}>>([])
const form = reactive({
  id: '',
  href: '',
  categoryId: '',
  name: '',
  tags: [],
  logo: '',
  desc: '',
  authorName: '',
  authorUrl: '',
  detail: ''
})
const rules = shallowRef<FormRules>({
  href: [
    { required: true, message: '请输入url', trigger: 'blur' },
    {
      pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/,
      message: '请输入正确的 url'
    }
  ],
  tags: [
    { required: true, message: '请输入标签', trigger: 'blur' }
  ],
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  desc: [
    { type: 'string', required: true, message: '请输入描述', trigger: 'blur' },
    { type: 'string', message: '描述不要超过 30 个字', max: 30 }
  ],
  logo: [{ required: true, message: '请输入logo', trigger: 'blur' }],
  authorUrl: [
    {
      pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/,
      message: '请输入正确的 url',
      trigger: 'change'
    }
  ],
  authorName: [
    {
      pattern: /^[\u4e00-\u9fa5]{2,6}$/,
      message: '作者名称在 2 个字到 6 个字以内',
      trigger: 'change'
    }
  ]
})

async function getTags () {
  const res = await axios.get(API_TAG_LIST)
  if (res.data.code === 1) {
    let data = res.data?.data || []
    data = data.map((item:{ name:string }) => {
      return {
        label: item.name,
        value: item.name
      }
    })
    tagList.value = data
  }
}
async function getCategories () {
  const { data } = await axios.get('/api/category/list')
  webCategories.value = data
}
async function onAddNav () {
  formRef.value?.validate().then(res => {
    submitLoading.value = true
    // 判断编辑还是更新

    axios.post(API_NAV, toRaw(form)).then(res => {
      if (res.data.code === 0) {
        ElMessage.error(`${res.data.msg}`)
      } else {
        ElMessage('感谢您的提交，请等待后台审核通过！')
        formRef.value?.resetFields()
      }
      submitLoading.value = false
      $emit('update:show', false)
      $emit('submit')
    }).catch(err => {
      console.warn(err)
    })
  }).catch(err => {
    console.log(err)
  })
}
async function getNavInfo () {
  const { href: url } = form
  if (!url) return
  formLoading.value = true
  try {
    const { data } = await axios.get(API_NAV_REPTILE + `?url=${url}`)
    form.logo = `https://www.google.com/s2/favicons?domain=${url}`
    form.name = data?.name
    form.desc = data?.desc
  } catch (e) {
    ElMessage.error('请求超时')
    $emit('update:show', false)
  }
  formLoading.value = false
}
getTags()
getCategories()
</script>

<style>
.dark{
  --el-text-color-regular:#fff;
}
</style>
