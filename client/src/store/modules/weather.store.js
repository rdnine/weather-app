import axios from 'axios'

import { reactive } from 'vue' // make state object reactive

const state = reactive({
  cities: {
    list: [],
    results: []
  },
  hasResults: false,
  hasCities: false,
  hasCity: false,
  chart: {
    labels: [],
    data: []
  }
})

const getters = {
  results: state => state.cities.results,
  list: state => state.cities.list,
  hasCities: state => state.hasCities,
  hasCity: state => state.hasCity,
  hasResults: state => state.hasResults,
  chartLabels: state => state.chart.labels,
  chartData: state => state.chart.data
}

const mutations = {
  ADD_TO_LIST(state, value) {
    // Check if city is already in cities.list
    if(!state.cities.list.some(el => el.id === value.id)) {
      state.cities.list.push(value)
      state.chart.labels.push(value.name)
      state.chart.data.push(value.weather.temperature)
      state.hasCity = false
    } else {
      state.hasCity = true
    }
  },
  REMOVE_FROM_LIST(state, value) {
    // Get object info before filter
    const obj = state.cities.list.find(el => el.id === value)
    
    // Find index in chart labels
    const chartLabelIndex = state.chart.labels.findIndex(el => el === obj.name)

    state.chart.labels.splice(chartLabelIndex, 1) // remove label based on index
    state.chart.data.splice(chartLabelIndex, 1) // remove data based on index

    // Filter cities list
    const newList = state.cities.list.filter(el => el.id !== value)

    if(!newList.length > 0) {
      state.hasCities = false;
    }
    state.cities.list = newList;
  },
  UPDATE_RESULT(state, value) {
    state.cities.results = value
  },
  UPDATE_LIST_STATUS(state, value) {
    state.hasCities = value;
  },
  UPDATE_RESULT_STATUS(state, value) {
    state.hasResults = value;
  },
  RESET_RESULTS(state) {
    state.cities.results = [];
    state.hasResults = false;
  }
}

const actions = {
  // Get cities based on search
  getCities({ commit }, payload) {
    axios
      .get(`http://localhost:8081/api/v1/weather/cities/${payload.value}`)
      .then(response => {
        if (response.status === 200) {
          commit('UPDATE_RESULT', response.data.data.list) // Update results
          commit('UPDATE_RESULT_STATUS', true) // Update results status
        }
      })
      .catch(err => {
        console.log(err.response.data.message)
        commit('UPDATE_RESULT_STATUS', true)
      })
  },
  // Add city to cities.list
  addCity({ commit }, payload) {
    axios.get(`http://localhost:8081/api/v1/weather/city/id/${payload}`)
    .then(response => {
      if (response.status === 200) {
        commit('ADD_TO_LIST', response.data.data) // Add city to list
        commit('UPDATE_LIST_STATUS', true) // Update cities status
        commit('RESET_RESULTS') // Reset search input and clear results list
      }
    })
    .catch(err => {
      console.log(err.response.data.message)
    })
  },
  // Removes City based on ID
  removeCity({ commit }, payload) {
    if(payload) {
      commit('REMOVE_FROM_LIST', payload)
    }
  },
  clearResults({ commit }) {
    commit('RESET_RESULTS')
  }
}

export default { state, getters, mutations, actions }