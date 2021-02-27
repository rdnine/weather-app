import { createStore } from 'vuex'
import axios from 'axios'

import weather from './modules/weather.store'

export default createStore({
  state: {
    ping: false
  },
  mutations: {
    UPDATE_PING(state, value) {
      state.ping = value
    }
  },
  actions: {
    pingApi({ commit }) {
      axios
        .get('http://localhost:8081/')
        .then(response => {
          if (response.status === 200) {
            commit('UPDATE_PING', true)
          }
        })
        .catch(err =>
          !err.response
            ? console.log('Error: API Service not available')
            : console.log(`${err.response.data.message}`)
        )
    }
  },
  modules: {
    weather
  }
})
