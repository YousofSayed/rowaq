import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../views/Home.vue'
import TafseerPage from '../views/TafseerPage.vue';
import QuranPage from '../views/QuranPage.vue';
import SuratList from '../views/SuratList.vue';
import Lectures from '../views/Lectures.vue';
import Bookmarks from '../views/Bookmarks.vue';
import Study from '../views/Study.vue';
import Books from '../views/Books.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/SuratList', component: SuratList },
    { path: '/QuranPage', component: QuranPage },
    { path: '/Tafseer', component: TafseerPage },
    { path: '/Lectures', component: Lectures },
    { path: '/Bookmarks', component: Bookmarks },
    { path: '/Study', component: Study, },
    { path: '/Books', component: Books, },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router