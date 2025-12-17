<template>
  <div class="comparison-container">
    <div class="comparison-header">
      <i class="fas fa-clipboard-check"></i>
      <h2>对比结果</h2>
      <button class="close-btn" @click="$emit('close')">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="comparison-content">
      <div class="comparison-section">
        <h3>原始文本</h3>
        <div class="text-box original">
          {{ originalText }}
        </div>
      </div>

      <div class="comparison-section">
        <h3>你的输入</h3>
        <div class="text-box user-input">
          {{ userInput }}
        </div>
      </div>

      <div class="comparison-section">
        <h3>详细对比</h3>
        <div class="detailed-comparison">
          <div class="comparison-grid">
            <div class="grid-header">位置</div>
            <div class="grid-header">原始字符</div>
            <div class="grid-header">你的输入</div>
            <div class="grid-header">状态</div>

            <template v-for="(item, index) in comparisonData" :key="index">
              <div class="grid-cell">{{ index + 1 }}</div>
              <div class="grid-cell">{{ item.original }}</div>
              <div class="grid-cell" :class="getInputClass(item)">
                {{ item.input || ' ' }}
              </div>
              <div class="grid-cell">
                <span class="status-badge" :class="getStatusClass(item)">
                  {{ getStatusText(item) }}
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
  name: 'WordComparison'
})

const props = defineProps({
  originalText: String,
  userInput: String
})

const emit = defineEmits(['close'])

const comparisonData = computed(() => {
  const data = []
  const maxLength = Math.max(props.originalText.length, props.userInput.length)

  for (let i = 0; i < maxLength; i++) {
    const originalChar = props.originalText[i] || ' '
    const inputChar = props.userInput[i] || ' '

    data.push({
      index: i,
      original: originalChar,
      input: inputChar,
      isCorrect: originalChar === inputChar,
      isEmpty: !props.userInput[i]
    })
  }

  return data
})

const getInputClass = (item) => {
  if (item.isEmpty) return 'empty'
  return item.isCorrect ? 'correct' : 'incorrect'
}

const getStatusClass = (item) => {
  if (item.isEmpty) return 'status-pending'
  return item.isCorrect ? 'status-correct' : 'status-incorrect'
}

const getStatusText = (item) => {
  if (item.isEmpty) return '未输入'
  return item.isCorrect ? '正确' : '错误'
}

const totalErrors = computed(() => {
  return comparisonData.value.filter(item => !item.isCorrect && !item.isEmpty).length
})

const accuracy = computed(() => {
  const totalTyped = props.userInput.length
  if (totalTyped === 0) return 100

  const correct = comparisonData.value.filter(item => item.isCorrect).length
  return Math.round((correct / totalTyped) * 100)
})
</script>

<style scoped>
.comparison-container {
  background: rgba(15, 52, 96, 0.8);
  border-radius: 20px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(76, 201, 240, 0.3);
  animation: slideIn 0.5s ease;
}

.comparison-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
  color: #4cc9f0;
}

.comparison-header h2 {
  font-size: 1.5rem;
  margin: 0;
  flex: 1;
}

.close-btn {
  background: rgba(248, 113, 113, 0.2);
  border: 2px solid #f87171;
  color: #f87171;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(248, 113, 113, 0.3);
  transform: rotate(90deg);
}

.comparison-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.comparison-section h3 {
  color: #b8b8d1;
  margin-bottom: 12px;
  font-size: 1.2rem;
}

.text-box {
  padding: 20px;
  background: rgba(22, 33, 62, 0.9);
  border-radius: 12px;
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  border: 1px solid rgba(76, 201, 240, 0.2);
}

.text-box.original {
  border-left: 4px solid #4cc9f0;
}

.text-box.user-input {
  border-left: 4px solid #4ade80;
}

.detailed-comparison {
  overflow-x: auto;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(76, 201, 240, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.grid-header {
  background: rgba(15, 52, 96, 0.9);
  padding: 15px;
  font-weight: 600;
  color: #4cc9f0;
  text-align: center;
  border-bottom: 2px solid rgba(76, 201, 240, 0.3);
}

.grid-cell {
  background: rgba(22, 33, 62, 0.9);
  padding: 12px;
  text-align: center;
  font-family: 'Courier New', monospace;
  border-bottom: 1px solid rgba(76, 201, 240, 0.1);
}

.grid-cell.correct {
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
}

.grid-cell.incorrect {
  color: #f87171;
  background: rgba(248, 113, 113, 0.1);
  text-decoration: line-through;
}

.grid-cell.empty {
  color: #b8b8d1;
  opacity: 0.7;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  min-width: 70px;
}

.status-correct {
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.status-incorrect {
  background: rgba(248, 113, 113, 0.2);
  color: #f87171;
}

.status-pending {
  background: rgba(184, 184, 209, 0.2);
  color: #b8b8d1;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-header:nth-child(3),
  .grid-header:nth-child(4),
  .grid-cell:nth-child(4n+3),
  .grid-cell:nth-child(4n+4) {
    display: none;
  }
}
</style>
