<template>
  <div class="article-picker">
    <div class="list">
      <div v-for="item in articles" :key="item.id" :class="['list-item', { selected: isSelected(item) }]"
        @click="onClickItem(item)">
        <div class="meta">
          <div class="title">{{ item.title }}</div>
          <div class="sub">{{ item.author }} · {{ formatDate(item.publishedAt) }}</div>
        </div>
        <div class="summary">{{ item.summary }}</div>
        <input v-if="multiple" class="checkbox" type="checkbox" :checked="isSelected(item)"
          @click.stop="toggleSelect(item)" aria-label="select-article" />
      </div>
    </div>

    <div class="preview" v-if="current">
      <h2 class="preview-title">{{ current.title }}</h2>
      <div class="preview-meta">{{ current.author }} · {{ formatDate(current.publishedAt) }}</div>
      <div class="preview-summary">{{ current.summary }}</div>
      <div class="preview-content" v-html="current.content"></div>
      <div class="actions">
        <button @click="confirmSelection">选择此文章</button>
      </div>
    </div>

    <div class="preview empty" v-else>
      <div>请选择一篇文章以查看预览</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PropType } from 'vue'

interface Article {
  id: string | number
  title: string
  summary?: string
  author?: string
  publishedAt?: string | number | Date
  content?: string
}

const props = defineProps({
  articles: {
    type: Array as PropType<Article[]>,
    default: () => [
      {
        id: 'a1',
        title: '示例文章：如何构建可重用组件',
        summary: '这是一个简短的摘要，说明文章主要内容与要点。',
        author: '作者 A',
        publishedAt: new Date().toISOString(),
        content: '<p>文章正文示例。可在此处渲染富文本或 markdown 转换后的 HTML。</p>'
      },
      {
        id: 'a2',
        title: '示例文章：前端性能优化',
        summary: '覆盖关键性能优化策略与实用技巧。',
        author: '作者 B',
        publishedAt: new Date().toISOString(),
        content: '<p>性能优化示例内容。</p>'
      }
    ]
  },
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | Array<string | number> | null>,
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

// initial selection
const selected = ref<Array<string | number>>([])
if (props.multiple) {
  if (Array.isArray(props.modelValue)) selected.value = [...(props.modelValue as unknown as Array<string | number>)]
} else {
  if (props.modelValue != null) selected.value = [props.modelValue as unknown as string | number]
}

// current previewed article
const current = ref<Article | null>(props.articles && props.articles.length ? (props.articles[0] as Article) : null)

watch(() => props.modelValue, (nv) => {
  if (props.multiple) {
    selected.value = Array.isArray(nv) ? [...(nv as Array<string | number>)] : []
  } else {
    selected.value = nv != null ? [nv as string | number] : []
  }
})

watch(() => props.articles, (n) => {
  if (!current.value && n && n.length) current.value = n[0] as Article
})

function isSelected (item: Article) {
  return selected.value.includes(item.id)
}

function onClickItem (item: Article) {
  current.value = item
  if (!props.multiple) {
    selected.value = [item.id]
    emit('update:modelValue', item.id)
    emit('select', item)
  }
}

function toggleSelect (item: Article) {
  const idx = selected.value.indexOf(item.id)
  if (idx >= 0) selected.value.splice(idx, 1)
  else selected.value.push(item.id)
  emit('update:modelValue', props.multiple ? [...selected.value] : (selected.value[0] ?? null))
  emit('select', item)
}

function confirmSelection () {
  if (!current.value) return
  if (props.multiple) {
    toggleSelect(current.value)
  } else {
    selected.value = [current.value.id]
    emit('update:modelValue', current.value.id)
    emit('select', current.value)
  }
}

function formatDate (d?: string | number | Date) {
  if (!d) return ''
  const dt = new Date(d)
  return dt.toLocaleString()
}
</script>

<style scoped>
.article-picker {
  display: flex;
  gap: 16px;
  border: 1px solid #e6e6e6;
  padding: 12px;
  border-radius: 6px
}

.list {
  width: 360px;
  max-height: 520px;
  overflow: auto
}

.list-item {
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  position: relative
}

.list-item:hover {
  background: #fafafa
}

.list-item.selected {
  background: #eef6ff
}

.meta {
  display: flex;
  flex-direction: column
}

.title {
  font-weight: 600
}

.sub {
  font-size: 12px;
  color: #888;
  margin-top: 4px
}

.summary {
  margin-top: 8px;
  font-size: 13px;
  color: #555
}

.checkbox {
  position: absolute;
  right: 10px;
  top: 14px
}

.preview {
  flex: 1;
  min-height: 200px;
  border-left: 1px dashed #eee;
  padding-left: 16px
}

.preview.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999
}

.preview-title {
  margin: 0 0 6px 0
}

.preview-meta {
  font-size: 13px;
  color: #888;
  margin-bottom: 8px
}

.preview-summary {
  font-weight: 500;
  margin-bottom: 10px
}

.preview-content {
  line-height: 1.6;
  color: #333
}

.actions {
  margin-top: 12px
}

.actions button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer
}
</style>
