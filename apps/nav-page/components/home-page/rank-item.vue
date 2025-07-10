<template>
  <div class="max-w-2xl mx-auto px-4">
    <div class="items-start justify-between sm:flex">
      <div>
        <h4 class="text-gray-800 text-xl font-semibold">Team members</h4>
        <p class="mt-2 text-gray-600 text-base sm:text-sm">Give your team members access to manage the system.</p>
      </div>
      <a href="javascript:void(0)"
        class="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg>
        New member
      </a>
    </div>
    <ul class="mt-12 divide-y">
      <li v-for="(item, idx) in members" :key="idx" class="py-5 flex items-start justify-between">
        <div class="flex gap-3">
          <img :src="item.avatar" class="flex-none w-12 h-12 rounded-full" />
          <div>
            <span class="block text-sm text-gray-700 font-semibold">{{ item.name }}</span>
            <span class="block text-sm text-gray-600">{{ item.email }}</span>
          </div>
        </div>
        <a href="javascript:void(0)"
          class="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">Manage</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const members = [
  {
    avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
    name: "John lorin",
    email: "john@example.com"
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    name: "Chris bondi",
    email: "chridbondi@example.com"
  },
  {
    avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    name: "yasmine",
    email: "yasmine@example.com"
  },
  {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
    name: "Joseph",
    email: "joseph@example.com"
  }
]
</script>