<template>
  <div class="controls-container">
    <div class="difficulty-selector">
      <button
        v-for="level in difficultyLevels"
        :key="level.value"
        class="difficulty-btn"
        :class="{ active: difficulty === level.value }"
        @click="changeDifficulty(level.value)"
      >
        <i :class="level.icon"></i>
        {{ level.label }}
      </button>
    </div>

    <div class="action-buttons">
      <button class="btn btn-primary" @click="$emit('check')">
        <i class="fas fa-check-circle"></i>
        检查错误
      </button>

      <button class="btn btn-secondary" @click="$emit('new-text')">
        <i class="fas fa-redo"></i>
        新文本
      </button>

      <button class="btn btn-warning" @click="$emit('reset')">
        <i class="fas fa-undo"></i>
        重置输入
      </button>
    </div>

    <div class="shortcuts-hint">
      <span class="hint-item">
        <kbd>Tab</kbd> 新练习
      </span>
      <span class="hint-item">
        <kbd>Ctrl</kbd> + <kbd>Enter</kbd> 检查
      </span>
      <span class="hint-item">
        <kbd>Esc</kbd> 重置
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  difficulty: {
    type: String,
    default: 'easy'
  }
})

const emit = defineEmits(['check', 'new-text', 'reset', 'difficulty-change'])

const difficultyLevels = ref([
  { value: 'easy', label: '简单', icon: 'fas fa-seedling', color: '#4ade80' },
  { value: 'medium', label: '中等', icon: 'fas fa-tree', color: '#fbbf24' },
  { value: 'hard', label: '困难', icon: 'fas fa-mountain', color: '#f87171' }
])

const changeDifficulty = (level) => {
  emit('difficulty-change', level)
}

// 键盘快捷键
const setupKeyboardShortcuts = () => {
  document.addEventListener('keydown', (event) => {
    // Tab 键：新文本
    if (event.key === 'Tab' && !event.ctrlKey && !event.altKey) {
      event.preventDefault()
      emit('new-text')
    }

    // Ctrl+Enter：检查错误
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
      emit('check')
    }

    // Esc：重置
    if (event.key === 'Escape') {
      emit('reset')
    }
  })
}

// 初始化键盘快捷键
setupKeyboardShortcuts()
</script>

<style scoped>
.controls-container {
  background: rgba(15, 52, 96, 0.5);
  border-radius: 20px;
  padding: 25px;
  backdrop-filter: blur(10px);
}

.difficulty-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.difficulty-btn {
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 12px;
  background: rgba(22, 33, 62, 0.8);
  color: #b8b8d1;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 120px;
}

.difficulty-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.difficulty-btn.active {
  background: rgba(76, 201, 240, 0.2);
  color: #4cc9f0;
  border: 2px solid #4cc9f0;
}

.difficulty-btn:nth-child(1).active {
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
  border-color: #4ade80;
}

.difficulty-btn:nth-child(2).active {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
  border-color: #fbbf24;
}

.difficulty-btn:nth-child(3).active {
  background: rgba(248, 113, 113, 0.2);
  color: #f87171;
  border-color: #f87171;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 160px;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.btn:active {
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #4361ee, #3a56d4);
  color: white;
}

.btn-secondary {
  background: linear-gradient(135deg, #7209b7, #5e0895);
  color: white;
}

.btn-warning {
  background: linear-gradient(135deg, #f72585, #e01e74);
  color: white;
}

.shortcuts-hint {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid rgba(76, 201, 240, 0.2);
}

.hint-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #b8b8d1;
}

kbd {
  background: rgba(76, 201, 240, 0.2);
  border: 1px solid #4cc9f0;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: monospace;
  font-size: 0.85em;
  min-width: 32px;
  text-align: center;
}

@media (max-width: 768px) {
  .difficulty-selector {
    flex-direction: column;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    min-width: 100%;
  }

  .shortcuts-hint {
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
