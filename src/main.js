
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VSkeletonLoader from 'v-skeleton-loader';

import {  faArrowRight } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRight)

const app =createApp(App)
app.use(VSkeletonLoader);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')