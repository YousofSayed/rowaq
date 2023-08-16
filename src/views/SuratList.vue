<template >
    <div id="suratNameList">
        <div v-for="sura in suratListRef" :id="sura.index" @click="setSuraNumInLocal">
            {{ sura.titleAr }}
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import {useRouter} from 'vue-router'
import surat from  '../assets/jsons-files/surat.json'
const suratList = surat;

export default {
    setup(props) {
        const suratListRef = ref(suratList);
        const store = useStore();
        const router = useRouter();
        const setSuraNumInLocal = (e) => {
            const target = e.currentTarget;
            router.push('/QuranPage')
            store.commit('setCurrentSuraName', `سورة ${target.textContent}`)
            store.dispatch('getAhyas', +target.id)
        }
        return { suratListRef, setSuraNumInLocal }
    },
}
</script>