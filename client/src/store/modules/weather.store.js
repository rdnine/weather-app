import axios from 'axios'

const state = {
  cities: [],
  hasCities: false
}
const getters = {
  cities: state => state.cities,
  hasCities: state => state.hasCities
}

const mutations = {
  UPDATE_CITIES(state, value) {
    state.cities = value
  },
  UPDATE_STATUS(state, value) {
    state.hasCities = value;
    console.log(state)
  },
  RESET(state) {
    state.cities = [];
    state.hasCities = false;
  }
}

const actions = {
  getCitiesList({ commit }, payload) {
    axios
      .get(`http://localhost:8081/api/v1/weather/cities/${payload.value}`)
      .then(response => {
        if (response.status === 200) {
          commit('UPDATE_CITIES', response.data.data.list)
          commit('UPDATE_STATUS', true)
        }
      })
      .catch(err => {
        console.log(err.response.data.message)
        commit('UPDATE_STATUS', true)
      })
  },
  clearResults({ commit }) {
    commit('RESET')
  }
}

export default { state, getters, mutations, actions }