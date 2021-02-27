<template>
  <footer>
    <div class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex-1 flex items-stretch justify-start">
            <div class="flex-shrink-0 flex items-center">
                <span class="ml-5">
                  <p class="text-sm text-white">Made With ❤️ by <a href="https://rdnine.dev/" class="hover:text-gray-400 transition-all duration-300" target="_blank" rel="noopener">rdnine</a></p>
                </span>
            </div>
          </div>
          <div class="flex-1 flex items-stretch justify-end">
            <div class="flex-shrink-0 flex items-center">
                <span class="mr-2">
                  <p class="text-sm text-white">
                    Service Status: 
                  </p>
                </span>
                  <span class="inline-flex rounded-full h-3 w-3" :class="ping ? 'bg-green-500' : 'bg-red-500'"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Footer',
  setup() {
    const store = useStore();

    return {
      ping: computed(() => store.state.ping), 
    }
  }
})
</script>
