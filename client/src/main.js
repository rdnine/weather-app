import { createApp } from 'vue'
import App from './containers/App.vue'
import router from './router'
import store from './store'

/* --- Import Prime Vue --- */
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import ToastService from 'primevue/toastservice'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
/* --- EOF Import Prime Vue --- */

import axios from 'axios'
import VueAxios from 'vue-axios'

import './styles/scss/base/tailwind.scss'
import './styles/scss/global.scss'

const app = createApp(App)

app.use(VueAxios, axios)

app.use(PrimeVue)
app.use(ToastService)
app.component('DataTable', DataTable)
app.component('Column', Column)

app.use(store)
app.use(router)
app.mount('#app')
