import './assets/css/style.css'
import './assets/css/mq.css'
import './modules/indexedDB.js'
import './assets/images/logoO.webp'

import { createApp } from 'vue';
import store from './modules/store';
import router from './modules/router';
import appVue from '../src/views/App.vue'
import { makeAppResponsive } from './modules/cocktail';

const app = createApp(appVue);
makeAppResponsive('body')
app.use(store).use(router).mount('#app')