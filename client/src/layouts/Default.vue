<template>
  <div class="overflow-x-hidden h-screen w-screen flex flex-col">
    <navbar />
    <main class="flex flex-1 bg-blue-500">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <statusbar />
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'Default',
  components: {
    navbar: defineAsyncComponent(() => import('@/components/core/Header.vue')),
    statusbar: defineAsyncComponent(() => import('@/components/core/Footer.vue')),
  },
})
</script>
