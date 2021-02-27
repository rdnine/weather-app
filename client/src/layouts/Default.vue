<template>
  <div>
    <navbar />
    <main>
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
