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
      <div class="max-w-3xl w-full text-center relative mb-12">
        <div class="bg-white shadow p-4 flex">
          <span class="w-auto flex justify-end items-center text-gray-500 p-2">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <label for="city-input" class="sr-only">Search City</label>
          <input class="w-full rounded p-2 focus:outline-none" id="city-input" v-model="city" type="text" placeholder="Try 'Aveiro'" />
          <button class="bg-red-400 rounded text-white p-2 pl-4 pr-4 focus:outline-none disabled:opacity-50" :disabled="!isDisabled" @click="getCities">
            <p class="font-semibold text-xs">Search</p>
          </button>
        </div>

        <transition name="fade">
          <div class="results absolute w-full top-full bg-white shadow p-4 flex mt-3 max-h-60 overflow-y-auto z-10" v-if="hasResults">
            <ul class="w-full">
              <template v-if="results.length > 0">
                <li class="py-2 flex flex-row cursor-pointer" v-for="city in results" :key="city.id">
                  <span class="flex-1 text-left text-gray-600">
                    {{ city.name }}
                    <img :src="`https://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`" alt="Flag" width="15" height="10" class="inline ml-2"/>
                  </span>
                  <span class="flex-1 text-center text-gray-600">{{ city.main.temp }}º C</span>
                  <span class="flex-1 text-center text-gray-600">{{ city.coord.lat }}, {{ city.coord.lon }}</span>
                  <span class="flex-1 text-right text-gray-600">
                    <button class="bg-red-400 rounded text-white p-3 focus:outline-none disabled:opacity-50" title="Add City" @click="addCity(city.id)">
                      <span class="sr-only">Add City</span>
                      <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </span>
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
        </transition>

      </div>

      <transition name="fade">
        <div class="max-w-3xl w-full text-center relative mb-5" v-if="hasCities">
          <h3 class="text-white text-2xl">Your <strong>Cities</strong></h3>
          <div class="mt-7 mb-3">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
              <!-- City Block -->
              <div class="relative bg-white shadow p-4 flex flex-col items-start" v-for="city in list" :key="city.id">
                <div class="flex mb-5">
                  <p class="text-gray-600 text-2xl font-medium">
                    {{ city.name }}
                  </p>
                  <p class="bg-red-400 rounded-full text-white text-xs p-2 px-3 ml-5">{{ city.country }}</p>
                </div>
                <div class="flex mb-3">
                  <p class="text-gray-800 text-5xl">
                    <strong>{{ city.weather.temperature }}</strong>
                  </p>
                  <p class="text-gray-800 text-2xl mt-2 ml-2">
                    º C
                  </p>
                </div>
                <div class="w-full flex items-center">
                  <div class="">
                    <img :src="`http://openweathermap.org/img/wn/${city.weather.icon}@2x.png`" width="75" height="75" alt="Weather Icon">
                  </div>
                  <div class="flex-1">
                    <p class="text-gray-400 text-md uppercase tracking-wider">{{ city.weather.description }}</p>
                  </div>
                </div>
                <div class="absolute -right-2 -top-2">
                  <button class="text-white rounded-full bg-red-400 p-2 focus:outline-none" @click="removeCity(city.id)">
                    <span class="sr-only">Remove City</span>
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <!-- EOF City Block -->
              
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="max-w-3xl w-full relative mb-5" v-if="hasCities">
          <div class="bg-white shadow p-4" >
            <Chart type="bar" :data="chartData" ref="barChart"/>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="max-w-3xl w-full relative mb-5" v-if="hasCities">
          <div class="bg-white shadow p-4 flex">
            <DataTable
              :value="list"
              rresponsiveLayout="stack"
              breakpoint="960px"
            >
              <Column field="name" header="City" sortable></Column>
              <Column field="country" header="Country" sortable>
                <template #body="{data}">
                  <img :src="`https://openweathermap.org/images/flags/${data.country.toLowerCase()}.png`" alt="Flag" width="15" height="10" class="inline ml-2"/>
                </template>
              </Column>
              <Column field="weather.temperature" header="Temperature" sortable ></Column>
              <Column field="dates.sunrise" header="Sunrise" sortable></Column>
              <Column field="dates.sunset" header="Sunset" sortable></Column>
            </DataTable>

          </div>
        </div>
      </transition>

      <Toast position="bottom-right" />
      
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

import Chart from 'primevue/chart'
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";

export default {
  name: 'Home',
  components: {
    Chart,
    Toast
  },
  setup() {
    const store = useStore()
    const toast = useToast()
    
    const city = ref('')
    const barChart = ref(null)

    watch(store.getters.chartData, () => {
      if(barChart.value) {
        barChart.value.refresh()
      }
    })

    const chartData = {
      labels: store.getters.chartLabels,
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: '#f87171',
          data: store.getters.chartData
        }
      ],
    }

    onMounted(() => store.dispatch('pingApi'))

    const isDisabled = computed(() => city.value.length > 0)

    const getCities = () => store.dispatch('getCities', city)
    const results = computed(() => store.getters.results)
    const hasResults = computed(() => store.getters.hasResults)
    const clear = () => {
      store.dispatch('clearResults')
      city.value = ""
    }

    const addCity = id => {
      store.dispatch('addCity', id)
      city.value = ""
    }

    const removeCity = id => store.dispatch('removeCity', id)

    const list = computed(() => store.getters.list)
    const hasCities = computed(() => store.getters.hasCities)
    const hasCity = computed(() => store.getters.hasCity)

    watch(hasCity, newState => {
      if(newState === true) {
        toast.add({severity:'error', summary: 'OOps', detail:'City has already been added', life:3000});
      }
    })

    return {
      city,
      getCities,
      results,
      hasResults,
      clear,
      addCity,
      removeCity,
      list,
      hasCities,
      hasCity,
      isDisabled,
      chartData,
      barChart
    }
  }
}
</script>
