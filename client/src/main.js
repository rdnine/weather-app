import { createApp } from 'vue'
import App from './containers/App.vue'
import router from './router'
import store from './store'

import './styles/scss/base/tailwind.scss'
import './styles/scss/global.scss'

createApp(App).use(store).use(router).mount('#app')
