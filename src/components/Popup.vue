<template lang="">
   <div id="popup">
            <div @click="showTafseer" v-html="icons.openBook"></div>
            <div class="line"></div>
            <div @click="playAudio" v-html="icons.play"></div>
        </div>  
</template>
<script>
import { $, $a, get } from '../modules/cocktail.js';
import urls from '../modules/urls.js';
import iconC from '../modules/icons.js';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

export default {
    setup(props) {
        const store = useStore();
        const { push } = useRouter()
        const audio = new Audio();
        const icons = iconC;

        const playAudio = async () => {
            const src = (await get(`${urls.ayahEndpoint}/${store.state.currentAhyahNum}/ar.alafasy`));
            audio.src = src.data.audio
            audio.load();
            audio.play();
        }

        window.addEventListener('click', () => {
            $a('#page>span')?.forEach((span) => span.classList.remove('selected'))
            $('#popup')?.classList.remove('show');
        })



        const showTafseer = () => {
            push('/Tafseer')
            store.dispatch('getTafseerOfAhyah')
        }

        return { playAudio, showTafseer, icons }
    }
}
</script>





