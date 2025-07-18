<template>
  <div class="flex cursor-pointer gap-2 items-center">
    <!-- From Uiverse.io by andrew-demchenk0 -->
    <label class="switch">
      <span class="icon-sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
      <span class="icon-moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
      <input type="checkbox" v-model="baseStore.isDarkMode"  class="theme-switch">
      <span class="slider"></span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import useBaseStore from '@/store'

import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()

const toggleDark = useToggle(isDark)

const baseStore = useBaseStore()

onMounted(() => {
  baseStore.isDarkMode = isDark.value
})
watch(() => baseStore.isDarkMode, (newVal) => {
  // const newTheme = newVal
  // 为了触发动画效果，添加定时
  setTimeout(() => {
    toggleDark(newVal)
  }, 300)
  baseStore.isDarkMode = newVal
})
function onChangeTheme(ev:Event) {
  const newTheme = (ev.target as HTMLInputElement).checked
  toggleDark(newTheme)
  baseStore.isDarkMode = newTheme
}

</script>

<style lang="scss" scoped>
/* From Uiverse.io by andrew-demchenk0 */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 58px;
  height: 28px;
}

.switch .theme-switch {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #a6d3f5;
  transition: .4s;
  border-radius: 30px;
}

.slider::before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  border-radius: 20px;
  left: 3px;
  bottom: 3px;
  z-index: 2;
  background-color: #e8e8e8;
  transition: .4s;
}

.icon-sun svg {
  position: absolute;
  top: 4px;
  right: 2px;
  z-index: 1;
  width: 22px;
  height: 22px;
}

.icon-moon svg {
  fill: #73C0FC;
  position: absolute;
  top: 3px;
  left: 5px;
  z-index: 1;
  width: 22px;
  height: 22px;
  rotate: 10deg;
}
/* .switch:hover */
.icon-sun svg {
  animation: rotate 15s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* .switch:hover */
/* .icon-moon svg {
  animation: tilt 5s linear infinite;
}

@keyframes tilt {
  0% {
    transform: rotate(0deg);
  }

  33% {
    transform: rotate(50deg);
  }

  66% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(0deg);
  }
} */

.theme-switch:checked + .slider {
  background-color: #183153;
}

.theme-switch:focus + .slider {
  box-shadow: 0 0 2px #183153;
}

.theme-switch:checked + .slider::before {
  transform: translateX(30px);
}
</style>
