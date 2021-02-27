<template>
  <div class="max-w-7xl w-full mx-auto p-2 sm:p-6 lg:p-8">
    <div class="relative flex flex-col items-center justify-between">
      <div class="text-center mb-12 mt-6">
        <h2 class="text-white text-3xl">
          <strong>Search</strong> and <strong>Compare</strong>
          <br>
          cities weather data
        </h2>
      </div>
      <div class="max-w-3xl w-full text-center relative">
        <div class="bg-white shadow p-4 flex">
          <span class="w-auto flex justify-end items-center text-gray-500 p-2">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input class="w-full rounded p-2 focus:outline-none" type="text" placeholder="Try 'Aveiro'" />
          <button class="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4 focus:outline-none">
            <p class="font-semibold text-xs">Search</p>
          </button>
        </div>

        <div class="absolute w-full top-full bg-white shadow p-4 flex mt-3">
          <ul class="w-full">
            <li class="py-2 flex flex-row cursor-pointer">
              <span class="flex-1 text-left text-gray-600">
                Aveiro
                <img src="https://openweathermap.org/images/flags/pt.png" alt="Flag" width="15" height="10" class="inline ml-2"/>
              </span>
              <span class="flex-1 text-center text-gray-600">15º C</span>
              <span class="flex-1 text-right text-gray-600">40.644, -8.646</span>
            </li>
            <li class="py-2 flex flex-row">
              <span class="flex-1 text-center text-gray-600">
                Não foram encontradas cidades
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  setup() {
    const store = useStore()

    onMounted(store.dispatch('pingApi'))
  }
}
</script>
