<template >
    <div id="tafseer">
        <div class="selection">
            <div class="box">
                <select @change="changeTafseerId" v-model="tafseerId">
                    <option :value="null" disabled>اختر التفسير</option>
                    <option v-for="(tafseerName, index) in tafseerNames" :id="tafseerName.id" :value="tafseerName.id">
                        {{ tafseerName.name }}</option>
                </select>
            </div>
            <div class="box">
                {{ currentSuraName }}
            </div>
        </div>
        <div class="boxs">
            <div class="box">
                <div class="ayah">{{ currentAhyahText }} <span class="suranum">{{ currentAhyahNumInSurah }}</span></div>
                <div class="content">{{ tafseerOfAhyah }}</div>
            </div>

        </div>
        <div class="arrows">
            <div class="content">
                <button id="prev" v-html="prevBtn" @click="prevAhyah"></button>
                <div class="line"></div>
                <button id="next" v-html="nextBtn" @click="nextAhyah"></button>
            </div>
        </div>
    </div>
</template>

<script>
import { get ,addClickClass } from "../modules/cocktail.js";
import icons from "../modules/icons.js";
import urls from "../modules/urls.js";
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

export default {
    setup(props) {
        const store = useStore();
        const {push} = useRouter();
        const tafseerNames = computed(() => store.state.tafseerNames);
        const currentSuraName = computed(() => store.state.currentSuraName);
        const currentAhyahText = computed(() => store.state.currentAhyahText);
        const tafseerOfAhyah = computed(() => store.state.tafseerOfAhyah)
        const currentAhyahNumInSurah = computed(() => store.state.currentAhyahNumInSurah)
        const xMarkIcon = icons.xMark;
        const prevBtn = icons.arrowRight;
        const nextBtn = icons.arrowLeft;
        const tafseerId = ref(null)

        //functions
        const nextAhyah = (e) => {
            addClickClass(e)
            store.commit('incrementAhyahNum');
            store.dispatch('getTafseerOfAhyah');
        }

        const prevAhyah = (e) => {
            addClickClass(e);
            store.commit('decrementAhyahNum');
            store.dispatch('getTafseerOfAhyah');
        }

        const changeTafseerId = (e) => {
            store.commit('setTafsserId', tafseerId);
            store.dispatch('getTafseerOfAhyah');
        }

        store.dispatch('getTafseerNames')
        return {
            tafseerNames, xMarkIcon, currentSuraName, tafseerId, changeTafseerId, currentAhyahText,
            tafseerOfAhyah, currentAhyahNumInSurah, prevBtn, prevAhyah, nextBtn, nextAhyah
        }
    }
}
</script>
