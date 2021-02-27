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
          <input class="w-full rounded p-2 focus:outline-none" v-model="city" type="text" placeholder="Try 'Aveiro'" />
          <button class="bg-red-400 rounded text-white p-2 pl-4 pr-4 focus:outline-none disabled:opacity-50" :disabled="!isDisabled" @click="getCitiesList">
            <p class="font-semibold text-xs">Search</p>
          </button>
        </div>

        <div class="absolute w-full top-full bg-white shadow p-4 flex mt-3" v-if="hasCities">
          <ul class="w-full">
            <template v-if="cities.length > 0">
              <li class="py-2 flex flex-row cursor-pointer" v-for="city in cities" :key="city.id">
                <span class="flex-1 text-left text-gray-600">
                  {{ city.name }}
                  <img :src="`https://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`" alt="Flag" width="15" height="10" class="inline ml-2"/>
                </span>
                <span class="flex-1 text-center text-gray-600">{{ city.main.temp }}º C</span>
                <span class="flex-1 text-right text-gray-600">{{ city.coord.lat }}, {{ city.coord.lon }}</span>
              </li>
            </template>
            <template v-else>
              <li class="py-2 flex flex-row cursor-pointer" @click="clear">
                <span class="flex-1 text-center text-gray-600">
                  Não foram encontradas cidades
                </span>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const city = ref('')

    const isDisabled = computed(() => city.value.length > 0)

    onMounted(store.dispatch('pingApi'))

    const getCitiesList = () => store.dispatch('getCitiesList', city)
    const clear = () => {
      store.dispatch('clearResults')
      city.value = ""
    }

    const cities = computed(() => store.getters.cities)
    const hasCities = computed(() => store.getters.hasCities)

    return {
      city,
      getCitiesList,
      clear,
      isDisabled,
      cities,
      hasCities
    }
  }
}
</script>
