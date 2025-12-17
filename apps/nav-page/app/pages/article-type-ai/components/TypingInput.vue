<template>
  <div class="input-container">
    <div class="section-header">
      <i class="fas fa-pen-alt"></i>
      <h2>输入区域</h2>
      <span v-if="isComplete" class="complete-badge">
        <i class="fas fa-check-circle"></i> 已完成
      </span>
    </div>

    <div class="input-wrapper">
      <textarea
        ref="textareaRef"
        v-model="inputValue"
        :placeholder="placeholder"
        class="typing-input"
        :class="{ complete: isComplete }"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="$emit('focus')"
        rows="6"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
      ></textarea>

      <div class="input-overlay" v-if="showOverlay">
        <div class="overlay-content">
          <i class="fas fa-mouse-pointer"></i>
          <p>点击此处开始输入</p>
        </div>
      </div>
    </div>

    <div class="input-stats">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: progress + '%' }"
          :class="{ complete: isComplete }"
        ></div>
      </div>
      <span class="progress-text">{{ progress }}% 完成</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
  modelValue: String,
  isComplete: Boolean
})

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'keydown'])

const textarea = useTemplateRef('textareaRef')
const inputValue = ref(props.modelValue)
const showOverlay = ref(true)

const placeholder = computed(() => {
  return props.isComplete
    ? '练习完成！按 Tab 键开始新的练习，或点击下方按钮检查结果。'
    : '在此处输入上方的英文文本... 输入错误时会实时高亮显示。'
})

const progress = computed(() => {
  const text = props.modelValue || ''
  const total = 100 // 假设最大长度，实际应该基于原文长度
  return Math.min(Math.round((text.length / total) * 100), 100)
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
  emit('input', event)

  // 隐藏覆盖层
  if (showOverlay.value) {
    showOverlay.value = false
  }
}

const handleKeydown = (event) => {
  emit('keydown', event)

  // Tab 键处理：开始新练习
  if (event.key === 'Tab') {
    event.preventDefault()
    emit('new-text')
  }

  // Ctrl+Enter 检查错误
  if (event.key === 'Enter' && event.ctrlKey) {
    event.preventDefault()
    emit('check-errors')
  }
}

// 自动聚焦
onMounted(() => {
  nextTick(() => {
    textarea.value?.focus()
  })
})

// 监听外部对 modelValue 的更改
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

// 当输入完成时显示覆盖层
watch(() => props.isComplete, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      showOverlay.value = true
    }, 500)
  }
})

// 暴露焦点方法给父组件
defineExpose({
  focus: () => textarea.value?.focus()
})
</script>

<style scoped>
.input-container {
  background: rgba(15, 52, 96, 0.5);
  border-radius: 20px;
  padding: 25px;
  backdrop-filter: blur(10px);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  color: #4cc9f0;
}

.section-header i {
  font-size: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  margin: 0;
}

.complete-badge {
  margin-left: auto;
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.typing-input {
  width: 100%;
  padding: 25px;
  font-size: 1.4rem;
  line-height: 1.8;
  background: rgba(22, 33, 62, 0.9);
  color: #e6e6e6;
  border: 2px solid rgba(76, 201, 240, 0.3);
  border-radius: 15px;
  resize: vertical;
  outline: none;
  transition: all 0.3s;
  font-family: 'Courier New', monospace;
  min-height: 200px;
  white-space: pre-wrap;
  word-break: break-word;
  letter-spacing: 0.5px;
}

.typing-input:focus {
  border-color: #4cc9f0;
  box-shadow: 0 0 0 3px rgba(76, 201, 240, 0.2);
}

.typing-input.complete {
  border-color: rgba(74, 222, 128, 0.5);
  background: rgba(22, 33, 62, 0.7);
}

.input-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 52, 96, 0.9);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.5s ease;
  cursor: pointer;
}

.overlay-content {
  text-align: center;
  color: #4cc9f0;
  padding: 30px;
}

.overlay-content i {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.8;
}

.overlay-content p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

.input-stats {
  display: flex;
  align-items: center;
  gap: 15px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: rgba(22, 33, 62, 0.8);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4361ee, #4cc9f0);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-fill.complete {
  background: linear-gradient(90deg, #4ade80, #22c55e);
}

.progress-text {
  font-size: 0.9rem;
  color: #b8b8d1;
  min-width: 80px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 768px) {
  .typing-input {
    font-size: 1.2rem;
    padding: 15px;
  }

  .overlay-content i {
    font-size: 2rem;
  }

  .overlay-content p {
    font-size: 1rem;
  }
}
</style>
