<template>
  <component :is="layout" />
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Default: defineAsyncComponent(() => import('@/layouts/Default.vue')),
  },
  computed: {
    layout() {
      return this.$router.currentRoute.value.meta.layout || 'Default'
    },
  },
})
</script>
