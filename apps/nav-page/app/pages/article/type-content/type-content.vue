<template>
  <div>
    <!-- 练习区域 -->
    <div class="text-display-container">
      <div class="section-title">
        <i class="fas fa-text-height"></i>
        <h2>练习文本</h2>
      </div>
      <div id="originalText" class="original-text">
        The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the English alphabet.
        Typing practice helps improve your speed and accuracy over time.
      </div>
    </div>
    <!-- 输入区域 -->
    <div class="input-container">
      <div class="section-title">
        <i class="fas fa-pen-alt"></i>
        <h2>输入区域</h2>
      </div>
      <textarea class="user-input" placeholder="在此处输入上方的英文文本... 输入时系统会实时检查错误。" @input="onInputContent" autofocus></textarea>
      <!-- <div class="" v-html=""></div> -->
      <div class="difficulty-selector">
        <button class="difficulty-btn active" data-difficulty="easy">简单</button>
        <button class="difficulty-btn" data-difficulty="medium">中等</button>
        <button class="difficulty-btn" data-difficulty="hard">困难</button>
      </div>

      <div class="controls">
        <button id="checkBtn" class="btn btn-primary">
          <i class="fas fa-check-circle"></i> 检查错误
        </button>
        <button id="newTextBtn" class="btn btn-secondary">
          <i class="fas fa-redo"></i> 新文本
        </button>
        <button id="resetBtn" class="btn btn-reset">
          <i class="fas fa-undo"></i> 重置输入
        </button>
      </div>
    </div>
    <!-- 翻译区域 -->
  </div>
</template>

<script lang="ts" setup>

const typeState = reactive({
  startTime: 0,
  errInputCount: 0,
  totalInputCount: 0
})
const userInput = ref('')
const targetText = ref('')

// 处理输入
function onInputContent(ev:InputEvent) {
  if (!ev.target) return
  userInput.value = ev.target.value

  if (typeState.startTime === 0 && userInput.value.length === 1) {
    // 开始计时
    // startTimer()
  }

  // 高亮显示
  highlightText()

  // 如果输入完成，停止计时
  if (userInput.value === targetText.value) {
    // endTimer()
    showComparison()
  }
}

// 高亮显示文本
function highlightText() {
  const originalText = targetText.value

  // 清空原始文本元素
  let errorCount = 0

  // 为每个字符创建span
  for (let i = 0; i < originalText.length; i++) {
    const charSpan = document.createElement('span')
    charSpan.textContent = originalText[i] || null

    if (i < userInput.value.length) {
      if (userInput.value[i] === originalText[i]) {
        charSpan.classList.add('correct')
      } else {
        charSpan.classList.add('incorrect')
        errorCount++
      }
    }

    // 当前输入位置
    if (i === userInput.length) {
      charSpan.classList.add('current')
    }

    originalTextElement.appendChild(charSpan)
  }

  // 更新错误数
  appState.errors = errorCount
}


// 显示对比结果
function showComparison() {
  const originalText = appState.originalText
  const userInput = appState.userInput

  // 清空对比文本元素

  // 创建对比文本
  for (let i = 0; i < Math.max(originalText.length, userInput.length); i++) {
    const charSpan = document.createElement('span')

    if (i < originalText.length && i < userInput.length) {
      // 两个文本都有字符
      if (userInput[i] === originalText[i]) {
        charSpan.textContent = originalText[i]
        charSpan.classList.add('correct')
      } else {
        // 显示错误：上方是正确字符，下方是用户输入的错误字符
        charSpan.innerHTML = `<span class="incorrect">${userInput[i] || ''}</span><br><span class="correct">${originalText[i]}</span>`
      }
    } else if (i < originalText.length) {
      // 只有原始文本有字符（用户输入较短）
      charSpan.textContent = originalText[i]
    } else {
      // 只有用户输入有字符（用户输入较长）
      charSpan.textContent = userInput[i]
      charSpan.classList.add('incorrect')
    }

    comparisonTextElement.appendChild(charSpan)
  }

  // 显示对比容器
  comparisonContainer.classList.add('active')

  // 滚动到对比容器
  comparisonContainer.scrollIntoView({ behavior: 'smooth' })
}

</script>

<style lang="scss" scoped>
// 默认输入内容是绿色
</style>
