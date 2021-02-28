import axios from 'axios'

const state = {
  cities: {
    list: [],
    results: []
  },
  hasResults: false,
  hasCities: false
}
const getters = {
  results: state => state.cities.results,
  list: state => state.cities.list,
  hasCities: state => state.hasCities,
  hasResults: state => state.hasResults
}

const mutations = {
  ADD_TO_LIST(state, value) {
    state.cities.list.push(value)
  },
  REMOVE_FROM_LIST(state, value) {
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
  getCities({ commit }, payload) {
    axios
      .get(`http://localhost:8081/api/v1/weather/cities/${payload.value}`)
      .then(response => {
        if (response.status === 200) {
          commit('UPDATE_RESULT', response.data.data.list)
          commit('UPDATE_RESULT_STATUS', true)
        }
      })
      .catch(err => {
        console.log(err.response.data.message)
        commit('UPDATE_RESULT_STATUS', true)
      })
  },
  addCity({ commit }, payload) {
    axios.get(`http://localhost:8081/api/v1/weather/city/id/${payload}`)
    .then(response => {
      if (response.status === 200) {
        commit('ADD_TO_LIST', response.data.data)
        commit('UPDATE_LIST_STATUS', true)
        commit('RESET_RESULTS')
      }
    })
    .catch(err => {
      console.log(err.response.data.message)
    })
  },
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