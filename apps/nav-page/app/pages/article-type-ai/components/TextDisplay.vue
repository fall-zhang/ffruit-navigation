<template>
  <div class="text-display-container">
    <div class="section-header">
      <i class="fas fa-text-height"></i>
      <h2>练习文本</h2>
      <span class="hint">({{ currentPosition }}/{{ totalChars }} 字符)</span>
    </div>

    <div class="text-display" ref="textDisplay">
      <span
        v-for="(char, index) in displayedText"
        :key="index"
        :class="getCharClass(char, index)"
        :data-index="index"
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'

const props = defineProps({
  originalText: String,
  userInput: String,
  currentPosition: Number
})

const textDisplay = ref(null)

const displayedText = computed(() => {
  return props.originalText.split('')
})

const totalChars = computed(() => props.originalText.length)

const getCharClass = (char, index) => {
  const classes = []

  if (index < props.userInput.length) {
    if (props.userInput[index] === char) {
      classes.push('correct')
    } else {
      classes.push('incorrect')
    }
  }

  if (index === props.currentPosition) {
    classes.push('current')
  }

  return classes
}

// 自动滚动到当前位置
watch(() => props.currentPosition, async () => {
  await nextTick()
  const currentChar = textDisplay.value?.querySelector('.current')
  if (currentChar) {
    currentChar.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'smooth'
    })
  }
})
</script>

<style scoped>
.text-display-container {
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

.hint {
  margin-left: auto;
  font-size: 0.9rem;
  color: #b8b8d1;
}

.text-display {
  font-size: 1.4rem;
  line-height: 1.8;
  padding: 25px;
  background: rgba(22, 33, 62, 0.8);
  border-radius: 15px;
  min-height: 200px;
  white-space: pre-wrap;
  word-break: break-word;
  letter-spacing: 0.5px;
  border: 2px solid rgba(76, 201, 240, 0.2);
  font-family: 'Courier New', monospace;
}

.text-display span {
  transition: all 0.2s ease;
  padding: 2px 1px;
  border-radius: 3px;
}

.text-display .correct {
  color: #4ade80;
  background-color: rgba(74, 222, 128, 0.1);
}

.text-display .incorrect {
  color: #f87171;
  background-color: rgba(248, 113, 113, 0.15);
  text-decoration: line-through;
}

.text-display .current {
  background-color: rgba(76, 201, 240, 0.3);
  border-bottom: 3px solid #4cc9f0;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { background-color: rgba(76, 201, 240, 0.3); }
  50% { background-color: rgba(76, 201, 240, 0.5); }
}

@media (max-width: 768px) {
  .text-display {
    font-size: 1.2rem;
    padding: 15px;
  }
}
</style>
