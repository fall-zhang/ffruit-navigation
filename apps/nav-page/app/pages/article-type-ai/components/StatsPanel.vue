<template>
  <div class="stats-panel">
    <div class="stat-item" v-for="stat in stats" :key="stat.label">
      <div class="stat-value">{{ stat.value }}</div>
      <div class="stat-label">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  accuracy: { type: Number, default: 100 },
  errors: { type: Number, default: 0 },
  typed: { type: Number, default: 0 },
  time: { type: Number, default: 0 }
})

const stats = computed(() => [
  { label: '准确率', value: `${props.accuracy}%`, color: '#4cc9f0' },
  { label: '错误数', value: props.errors, color: props.errors > 0 ? '#f87171' : '#4cc9f0' },
  { label: '已输入', value: props.typed, color: '#4cc9f0' },
  { label: '用时', value: `${props.time}s`, color: '#4cc9f0' }
])
</script>

<style scoped>
.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.stat-item {
  background: rgba(15, 52, 96, 0.7);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.stat-value {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #b8b8d1;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .stats-panel {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-value {
    font-size: 1.8rem;
  }
}
</style>
