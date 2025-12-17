<template>
  <transition name="fade">
    <div
      v-if="visible"
      ref="root"
      class="float-trans"
      :style="positionStyle"
      role="dialog"
      aria-label="translation-popup"
    >
      <header class="ft-header">
        <div class="word">{{ word || '—' }}</div>
        <button class="close" @click="close">✕</button>
      </header>

      <main class="ft-body">
        <div v-if="loading" class="loading">加载中……</div>
        <div v-else-if="error" class="error">{{ error }}</div>

        <div v-else>
          <div v-if="entry.phonetic || entry.partOfSpeech" class="meta">
            <span v-if="entry.phonetic" class="phonetic">/{{ entry.phonetic }}/</span>
            <span v-if="entry.partOfSpeech" class="pos">{{ entry.partOfSpeech }}</span>
          </div>

          <ul class="defs">
            <li v-for="(def, idx) in entry.definitions" :key="idx" class="def-item">
              <div class="def-text">{{ def.definition }}</div>
              <div v-if="def.example" class="def-example">示例：{{ def.example }}</div>
            </li>
          </ul>

          <div v-if="entry.source" class="source">来源：{{ entry.source }}</div>
        </div>
      </main>

      <footer class="ft-footer">
        <button class="copy" @click="copyFirst">复制释义</button>
        <button class="more" @click="openDict">在词典中打开</button>
      </footer>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import type { PropType } from 'vue'

interface Definition {
  definition: string
  example?: string
}

interface Entry {
  word?: string
  phonetic?: string
  partOfSpeech?: string
  definitions: Definition[]
  source?: string
}

const props = defineProps({
  word: { type: String, default: '' },
  visible: { type: Boolean, default: false },
  position: { type: Object as PropType<{ x?: number; y?: number }>, default: () => ({ x: 100, y: 100 }) },
  autoFetch: { type: Boolean, default: true },
  maxDefinitions: { type: Number, default: 6 }
})

const emit = defineEmits(['close', 'select', 'fetched'])

const root = ref<HTMLElement | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const entry = ref<Entry>({ definitions: [] })

const positionStyle = computed(() => {
  const x = props.position?.x ?? 100
  const y = props.position?.y ?? 100
  return { left: x + 'px', top: y + 'px' }
})

async function fetchFromApi (w: string) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('词典查询失败')
  const data = await res.json()
  // map to Entry
  const first = Array.isArray(data) ? data[0] : null
  if (!first) throw new Error('未找到释义')
  const phonetic = first.phonetic || (first.phonetics && first.phonetics[0] && first.phonetics[0].text)
  const meanings = first.meanings || []
  const defs: Definition[] = []
  for (const m of meanings) {
    const pos = m.partOfSpeech
    for (const d of m.definitions || []) {
      if (defs.length >= props.maxDefinitions) break
      defs.push({ definition: d.definition, example: d.example })
    }
    if (defs.length >= props.maxDefinitions) break
  }
  return { word: first.word, phonetic, partOfSpeech: meanings[0]?.partOfSpeech, definitions: defs, source: 'dictionaryapi.dev' } as Entry
}

// small local fallback dictionary
const localDict: Record<string, Entry> = {
  hello: { word: 'hello', phonetic: 'həˈloʊ', partOfSpeech: 'interjection', definitions: [{ definition: '表示问候', example: 'Hello, how are you?' }], source: 'local' },
  apple: { word: 'apple', phonetic: 'ˈæpəl', partOfSpeech: 'noun', definitions: [{ definition: '苹果，水果', example: 'An apple a day keeps the doctor away.' }], source: 'local' }
}

async function fetchWord (w: string) {
  loading.value = true
  error.value = null
  entry.value = { definitions: [] }
  try {
    // prefer online
    try {
      const e = await fetchFromApi(w)
      entry.value = e
      emit('fetched', e)
      return
    } catch (err) {
      // fallback to local
    }

    const key = (w || '').toLowerCase()
    if (localDict[key]) {
      entry.value = localDict[key]
      emit('fetched', entry.value)
    } else {
      throw new Error('未找到对应翻译')
    }
  } catch (err: any) {
    error.value = err?.message || String(err)
  } finally {
    loading.value = false
  }
}

watch([
  () => props.word,
  () => props.visible
], ([w, vis]) => {
  if (vis && w && props.autoFetch) {
    fetchWord(w)
  }
})

function onDocClick (e: MouseEvent) {
  if (!root.value) return
  const el = e.target as Node
  if (root.value && !root.value.contains(el)) {
    emit('close')
  }
}

function onKey (e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

function close () {
  emit('close')
}

function copyFirst () {
  const first = entry.value.definitions[0]?.definition || ''
  if (!first) return
  navigator.clipboard?.writeText(first)
}

function openDict () {
  const w = props.word || ''
  if (!w) return
  const url = `https://www.google.com/search?q=define+${encodeURIComponent(w)}`
  window.open(url, '_blank')
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .15s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
.float-trans {
  position: fixed;
  z-index: 1200;
  width: 360px;
  max-width: calc(100vw - 24px);
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 22px rgba(0,0,0,0.12);
  border: 1px solid rgba(0,0,0,0.06);
  overflow: hidden;
  font-size: 14px;
}
.ft-header { display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-bottom:1px solid #f2f2f2 }
.word { font-weight:600 }
.close { border:0;background:transparent;cursor:pointer }
.ft-body { padding:10px; max-height:320px; overflow:auto }
.meta { color:#666;margin-bottom:8px }
.phonetic { margin-right:8px }
.defs { list-style:none;padding:0;margin:0 }
.def-item { padding:6px 0;border-bottom:1px dashed #f5f5f5 }
.def-text { color:#222 }
.def-example { color:#666;font-size:13px;margin-top:4px }
.ft-footer { display:flex;gap:8px;justify-content:flex-end;padding:8px;border-top:1px solid #f2f2f2 }
.ft-footer button { padding:6px 10px;border-radius:4px;border:1px solid #ddd;background:#fff;cursor:pointer }
.loading { color:#666 }
.error { color:#c00 }
.source { margin-top:8px;color:#888;font-size:12px }
</style>
