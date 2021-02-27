<template>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Default',
})
</script>
