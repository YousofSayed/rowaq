<template>
    <nav class="mainNav">
        <ul class="list">
            <li  v-for="(icon, i) in icons" :num="i" @click="toggleSuratNameList" :route="icon.route">
                <span >{{ icon.text }}</span><i v-html="icon.icon"></i>
            </li>
        </ul>
    </nav>
</template>
<script>
import { ref , onMounted} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import iconsC from "../modules/icons.js"
import { $a } from '../modules/cocktail';
export default {
    setup() {
        const {commit} = useStore();
        const router = useRouter();
        const icons = ref([
            { icon: iconsC.musahf, text: 'المصحف', route: '/SuratList' },
            { icon: iconsC.video, text: 'المحاضرات', route: '/Lectures', },
            { icon: iconsC.bookmarkFill, text: 'المرجعيات', route: '/Bookmarks', },
            { icon: iconsC.headphone, text: 'الاستماع', route: '/Study', },
            { icon: iconsC.openBook, text: 'الكتب', route: '/Books', },
        ]);

        onMounted(() => {
            
            $a('.mainNav ul li').forEach((e)=>{
                e.on('click',(ev)=>{
                    $a('.mainNav ul li').forEach((e)=>e.classList.remove('clkFill'));
                    ev.currentTarget.classList.add('clkFill')
                })
            })
        })

        const toggleSuratNameList = (e) => {
            const target = e.currentTarget;
            const id = target.getAttribute('num');
            const route = target.getAttribute('route');
            router.push(`${route}`);
            commit('changeCurrentBookmark', null);
            commit('setSelectClass', null);
        }

        return {
            icons, toggleSuratNameList,
        }
    },
}
</script>