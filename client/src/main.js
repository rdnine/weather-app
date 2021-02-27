import { createApp } from 'vue'
import App from './containers/App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './styles/scss/base/tailwind.scss'
import './styles/scss/global.scss'

const app = createApp(App)

app.use(VueAxios, axios)
app.use(PrimeVue)

app.use(store)
app.use(router)
app.mount('#app')
