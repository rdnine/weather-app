<template>
  <header>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex-1 flex items-stretch justify-start">
            <div class="flex-shrink-0 flex items-center">
              <img class="block h-8 w-auto" src="@/assets/logo.png" alt="Logo" />
                <span class="ml-5">
                  <h1 class="text-white uppercase"><a href="/"><strong>Weather App</strong></a></h1>
                </span>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a href="https://github.com/rdnine/weather-app" target="_blank" rel="noopener" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none transition duration-300">
              <span class="sr-only">Github</span>
              <svg fill="currentColor" class="h-6 w-6"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"></path></svg>
            </a>

            <div class="ml-3 relative">
              <div>
                <button class="bg-gray-800 text-gray-400 flex text-sm rounded-full focus:outline-none ring-offset-2 ring-offset-gray-800 ring-white hover:text-white transition duration-300" id="project-info" aria-haspopup="true" title="Show project Info" @click="info = !info" :class="info ? 'ring-2' : ''">
                  <span class="sr-only">Open Info</span>
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 px-4 bg-white ring-1 ring-black ring-opacity-5" aria-orientation="vertical" aria-labelledby="project-info" :class="info ? 'block' : 'hidden'">
                <p class="text-sm text-gray-700 mb-3"><strong>Made With:</strong></p>
                <ul class="list-disc list-inside">
                  <li class="text-sm text-gray-700 mb-1">Vue 3</li>
                  <li class="text-sm text-gray-700 mb-1">TailwindCSS</li>
                  <li class="text-sm text-gray-700 mb-1">PrimeVUE</li>
                </ul>
                <hr class="my-2">
                <ul class="list-disc list-inside">
                  <li class="text-sm text-gray-700 mb-1">Node JS</li>
                  <li class="text-sm text-gray-700 mb-1">Express JS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    const info = ref(false)

    return {
      info
    }
  }
})
</script>
