
<!-- 一个练习打英文的工具 -->
<template>
  <div class="w-full h-full" @click="onClickTypeApp">
    <p class="article-paragraph">
      <TypeContent :article="inputArticle"></TypeContent>
    </p>
    <main>
      <NodeSection v-for="(section,index) in inputArticle" :key="index"/>
    </main>
    <input type="text" ref="inputRef" class="opacity-0" v-model="inputText" @keypress="onKeyPress" @keydown="onKeyPress">
  </div>
  <NuxtPage page-key="static"></NuxtPage>
</template>

<script lang="ts" setup>
import type { ArticleType } from './types'
import TypeContent from './type-content/type-content.vue'
import { NodeSection } from './type-content/node-section/node-section'
import { articleParse, testString } from './utils/article-parse'
import { handleWithdraw, addLetterToArticle } from './utils/article-opt'
const inputText = ref('')
const inputRef = useTemplateRef('inputRef')
const typeState = reactive({
  startTime: 0,
  errInputCount: 0,
  totalInputCount: 0,
  editSpanIndex: 0
})

const inputArticle = ref<ArticleType>({
  type: 'article',
  title: '',
  sections: articleParse(testString),
  state: 'typed',
  startTime: 0,
  endTime: 0,
  errInputCount: 0,
  totalInputCount: 0,
  editSpanIndex: 0,
  wordCount: 0,
  letterCount: 0
})

const isFocus = ref(false)

function onClickTypeApp () {
  inputRef.value?.focus()
  isFocus.value = true
}
function onKeyPress (ev:KeyboardEvent) {
  if (ev.key.length > 1) {
    if (optKeySet.has(ev.key)) {
      return
    }
    if (removeKeySet.has(ev.key)) {
      handleWithdraw(inputArticle.value)
    }
    if (['Enter'].includes(ev.key)) {
      // 切换 section
      const isFinish = isFinishArticle(inputArticle.value)
      const isCompleteRight = isTotalRight(inputArticle.value)
      if (isFinish && isCompleteRight) {
        // const jsConfetti = new JSConfetti()
        // jsConfetti.addConfetti({
        //   emojis: ['🌈', '⚡️',  '✨', '💫', '🌸'],
        // })
      } else if (isFinish) {
        // const jsConfetti = new JSConfetti()
        // jsConfetti.addConfetti({ })
      }
      console.log('完成，牛逼')
    }
    return
  }
  addLetterToArticle(inputArticle.value, ev.key)
}

function isFinishArticle (article:ArticleType):boolean {
  article.sections.at(-1)?.sentences.at(-1)?.words.at(-1)?.state === 'typed'
  return false
}

const optKeySet = new Set(['ContextMenu', 'Meta', 'Alt', 'Shift', 'Control', 'Tab', 'CapsLock'])
const removeKeySet = new Set(['Backspace', 'Delete'])

onUnmounted(() => {

})
onMounted(() => {

})
</script>

<style lang="scss" scoped>
  body {
    background-color: #1a1a2e;
    color: #e6e6e6;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
  }

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    width: 100%;
  }

  h1 {
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
    margin-bottom: 15px;
  }

  .stats-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 15px;
    gap: 15px;
  }

  .stat-box {
    background-color: #16213e;
    padding: 15px;
    border-radius: 10px;
    min-width: 150px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: #4cc9f0;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #b8b8d1;
    margin-top: 5px;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .text-display-container {
    background-color: #16213e;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    color: #4cc9f0;
    font-size: 1.4rem;
  }

  .section-title i {
    font-size: 1.6rem;
  }

  .original-text {
    font-size: 1.4rem;
    line-height: 1.8;
    padding: 20px;
    background-color: #0f3460;
    border-radius: 10px;
    min-height: 180px;
    white-space: pre-wrap;
    letter-spacing: 0.5px;
    border: 1px solid #2d4059;
  }

  .input-container {
    background-color: #16213e;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  .user-input {
    width: 100%;
    height: 200px;
    padding: 20px;
    font-size: 1.4rem;
    line-height: 1.8;
    background-color: #0f3460;
    color: #e6e6e6;
    border: 2px solid #2d4059;
    border-radius: 10px;
    resize: none;
    outline: none;
    transition: border-color 0.3s;
    letter-spacing: 0.5px;
    white-space: pre-wrap;
    overflow-y: auto;
  }

  .user-input:focus {
    border-color: #4cc9f0;
  }

  .comparison-container {
    background-color: #16213e;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    display: none;
  }

  .comparison-container.active {
    display: block;
  }

  .comparison-text {
    font-size: 1.4rem;
    line-height: 1.8;
    padding: 20px;
    background-color: #0f3460;
    border-radius: 10px;
    min-height: 180px;
    white-space: pre-wrap;
    letter-spacing: 0.5px;
    border: 1px solid #2d4059;
  }

  .correct {
    color: #4ade80;
    background-color: rgba(74, 222, 128, 0.1);
  }

  .incorrect {
    color: #f87171;
    background-color: rgba(248, 113, 113, 0.1);
    text-decoration: line-through;
  }

  .current {
    background-color: rgba(76, 201, 240, 0.2);
    border-bottom: 2px solid #4cc9f0;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .btn {
    padding: 15px 30px;
    font-size: 1.1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s;
    font-weight: 600;
  }

  .btn-primary {
    background-color: #4361ee;
    color: white;
  }

  .btn-primary:hover {
    background-color: #3a56d4;
    transform: translateY(-3px);
  }

  .btn-secondary {
    background-color: #7209b7;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #5e0895;
    transform: translateY(-3px);
  }

  .btn-reset {
    background-color: #f72585;
    color: white;
  }

  .btn-reset:hover {
    background-color: #e01e74;
    transform: translateY(-3px);
  }

  .difficulty-selector {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }

  .difficulty-btn {
    padding: 10px 20px;
    border-radius: 20px;
    background-color: #2d4059;
    color: #b8b8d1;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
  }

  .difficulty-btn.active {
    background-color: #4cc9f0;
    color: #16213e;
  }

  .footer {
    margin-top: 40px;
    text-align: center;
    color: #b8b8d1;
    font-size: 0.9rem;
    padding: 20px;
  }

  .instructions {
    background-color: #16213e;
    border-radius: 15px;
    padding: 20px;
    margin-top: 20px;
    font-size: 1rem;
    line-height: 1.6;
  }

  .instructions h3 {
    color: #4cc9f0;
    margin-bottom: 10px;
  }

  .instructions ul {
    padding-left: 20px;
  }

  .instructions li {
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    .container {
      padding: 10px;
    }

    h1 {
      font-size: 2rem;
    }

    .original-text,
    .user-input,
    .comparison-text {
      font-size: 1.1rem;
    }

    .stats-container {
      flex-direction: column;
      align-items: center;
    }

    .stat-box {
      width: 100%;
    }
  }
</style>
