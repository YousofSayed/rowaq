import './assets/css/style.css'
import './assets/css/mq.css'
import './modules/indexedDB.js'
import './assets/images/logoO.webp'

import { createApp } from 'vue';
import store from './modules/store';
import router from './modules/router';
import appVue from '../src/views/App.vue'
import { get, makeAppResponsive } from './modules/cocktail';

const app = createApp(appVue);
makeAppResponsive('body')
app.use(store).use(router).mount('#app')
// console.log(await get(`https://proxy-tafseer.cyclic.cloud/getTafseer/1/1/1`));
//recommmends websites//
//https://www.albitaqat.com/
//https://proxy-tafseer.cyclic.cloud/getTafseer/1/1/1