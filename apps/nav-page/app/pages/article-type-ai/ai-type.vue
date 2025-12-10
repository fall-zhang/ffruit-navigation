<template>
  <div class="app-container">
    <!-- 标题区域 -->
    <header class="app-header">
      <h1><i class="fas fa-keyboard"></i> Vue 打字练习器</h1>
      <p class="subtitle">使用 Vue 3 构建的交互式打字练习应用</p>
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 统计面板 -->
      <StatsPanel
        :accuracy="accuracy"
        :errors="errorCount"
        :typed="typedChars"
        :time="elapsedTime"
        @reset="resetAll"
      />

      <!-- 练习文本显示 -->
      <TextDisplay
        :originalText="currentText"
        :userInput="userInput"
        :currentPosition="currentPosition"
      />

      <!-- 输入区域 -->
      <TypingInput
        v-model="userInput"
        :isComplete="isComplete"
        @input="handleTyping"
        @focus="startTimer"
        @keydown.space.prevent="handleSpace"
      />

      <!-- 控制面板 -->
      <Controls
        :difficulty="difficulty"
        @check="checkErrors"
        @new-text="generateNewText"
        @reset="resetInput"
        @difficulty-change="changeDifficulty"
      />

      <!-- 对比结果 -->
      <Comparison
        v-if="showComparison"
        :originalText="currentText"
        :userInput="userInput"
        @close="showComparison = false"
      />

      <!-- 使用说明 -->
      <div class="instructions">
        <h3><i class="fas fa-info-circle"></i> 使用说明</h3>
        <ul>
          <li>在输入框中逐字输入上方显示的英文文本</li>
          <li>错误字符会实时以红色高亮显示</li>
          <li>按 <kbd>Tab</kbd> 键可以快速开始新的练习</li>
          <li>选择不同难度级别获得适合的练习文本</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import StatsPanel from './components/StatsPanel.vue'
import TextDisplay from './components/TextDisplay.vue'
import TypingInput from './components/TypingInput.vue'
import Controls from './components/Controls.vue'
import Comparison from './components/Comparison.vue'
import { textLibrary } from './utils/textLibrary'

// 响应式状态
const userInput = ref('')
const currentText = ref('')
const difficulty = ref('easy')
const startTime = ref(null)
const elapsedTime = ref(0)
const timerInterval = ref(null)
const showComparison = ref(false)

// 计算属性
const accuracy = computed(() => {
  if (typedChars.value === 0) return 100
  const correctChars = Array.from(userInput.value).reduce((count, char, index) => {
    return count + (index < currentText.value.length && char === currentText.value[index] ? 1 : 0)
  }, 0)
  return Math.round((correctChars / typedChars.value) * 100)
})

const errorCount = computed(() => {
  return Array.from(userInput.value).reduce((count, char, index) => {
    return count + (index < currentText.value.length && char !== currentText.value[index] ? 1 : 0)
  }, 0)
})

const typedChars = computed(() => userInput.value.length)

const currentPosition = computed(() => userInput.value.length)

const isComplete = computed(() => {
  return typedChars.value >= currentText.value.length
})

// 方法
const generateNewText = () => {
  const texts = textLibrary[difficulty.value]
  const randomIndex = Math.floor(Math.random() * texts.length)
  currentText.value = texts[randomIndex]
  resetInput()
}

const resetInput = () => {
  userInput.value = ''
  showComparison.value = false
  resetTimer()
}

const resetAll = () => {
  resetInput()
  generateNewText()
}

const handleTyping = (event) => {
  if (!startTime.value) {
    startTimer()
  }

  // 限制输入长度不超过原文
  if (userInput.value.length > currentText.value.length) {
    userInput.value = userInput.value.substring(0, currentText.value.length)
  }
}

const handleSpace = (event) => {
  // 空格键处理：防止页面滚动
  if (isComplete.value) {
    generateNewText()
  }
}

const startTimer = () => {
  if (!startTime.value) {
    startTime.value = Date.now()
    timerInterval.value = setInterval(() => {
      elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000)
    }, 1000)
  }
}

const resetTimer = () => {
  clearInterval(timerInterval.value)
  startTime.value = null
  elapsedTime.value = 0
}

const checkErrors = () => {
  showComparison.value = true
  if (isComplete.value) {
    clearInterval(timerInterval.value)
  }
}

const changeDifficulty = (newDifficulty) => {
  difficulty.value = newDifficulty
  generateNewText()
}

// 生命周期钩子
onMounted(() => {
  generateNewText()
})

// 监听输入完成
watch(isComplete, (newValue) => {
  if (newValue) {
    clearInterval(timerInterval.value)
  }
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #e6e6e6;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px;
  background: rgba(15, 52, 96, 0.7);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.app-header h1 {
  font-size: 2.8rem;
  margin-bottom: 10px;
  background: linear-gradient(to right, #4cc9f0, #4361ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  color: #b8b8d1;
  opacity: 0.9;
}

.main-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.instructions {
  background: rgba(15, 52, 96, 0.5);
  border-radius: 15px;
  padding: 25px;
  border-left: 4px solid #4cc9f0;
}

.instructions h3 {
  color: #4cc9f0;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.instructions ul {
  list-style: none;
  padding-left: 0;
}

.instructions li {
  margin-bottom: 12px;
  padding-left: 25px;
  position: relative;
  line-height: 1.6;
}

.instructions li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4cc9f0;
  font-weight: bold;
}

kbd {
  background: rgba(76, 201, 240, 0.2);
  border: 1px solid #4cc9f0;
  border-radius: 4px;
  padding: 2px 6px;
  font-family: monospace;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }

  .app-header {
    padding: 20px;
  }
}
</style>
