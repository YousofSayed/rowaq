import { createStore } from 'vuex';
import { get } from "./cocktail.js";
import urls from "./urls.js";

const store = createStore({
    state() {
        return {
            showSuratList: false,
            showQuranPage: false,
            showTafseer: false,
            currentSuraName: null,
            currentSuraNum: null,
            currentAhyahNum: null,
            currentAhyahNumInSurah: null,
            currentAhyahText: null,
            ahyas: null,
            ahyahNumOfSura: null,
            audioSrc: null,
            tafseerNames: null,
            tafseerId: 1,
            tafseerOfAhyah: null,
            elSelectClass:null,
            currentBookmark:null,

        }
    },
    mutations: {
        showSuratListCb(state) {
            state.showSuratList = !state.showSuratList;
        },
        showQuranPageCb(state) {
            state.showQuranPage = true;
        },
        showTafseerCb(state, data) {
            state.showTafseer = data
        },
        setCurrentSuraName(state, data) {
            state.currentSuraName = data;
        },
        setCurrentSura(state, data) {
            state.currentSuraNum = data;
        },
        setCurrentAhyahNumInSurah(state, data) {
            state.currentAhyahNumInSurah = data;
        },
        setCurrentAhyah(state, data) {
            state.currentAhyahNum = data;
        },
        setCurrentAhyahText(state, data) {
            state.currentAhyahText = data;
        },
        setaAhyahsNumOfSura(state, data) {
            state.ahyahNumOfSura = data;
        },
        setTafseerNames(state, data) {
            state.tafseerNames = data;
        },
        setTafsserId(state, data) {
            state.tafseerId = data;
        },
        setTafseerOfAhyah(state, data) {
            state.tafseerOfAhyah = data;
        },
        changeAhyas(state, data) {
            state.ahyas = data;
        },
        incrementAhyahNum(state) {
            if (state.currentAhyahNumInSurah >= state.ahyahNumOfSura) { console.warn('This is final ahyah'); return; }
            state.currentAhyahNumInSurah++;
            state.currentAhyahNum++;
        },
        decrementAhyahNum(state) {
            if (state.currentAhyahNumInSurah <= 1) { console.warn('This ayah first ahyah'); return }
            state.currentAhyahNumInSurah--;
            state.currentAhyahNum--;
        },
        changeCurrentBookmark(state , data){
            state.currentBookmark = data;
        },
        setSelectClass(state,data){
            state.elSelectClass = data;
        }

    },
    actions: {
        async getAhyas(store, data) {
            try {
                store.commit('showQuranPageCb');
                store.commit('setCurrentSura', data)
                const ahyas = await get(`${urls.surahEndpoint}/${data}`);
                store.commit('setaAhyahsNumOfSura', ahyas.data.numberOfAyahs)
                if (ahyas.code == '200') {
                    store.commit('changeAhyas', ahyas.data.ayahs);
                }
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async getTafseerNames(store) {
            const tafseerNames = await get(`${urls.tafseerEndpoint}`);
            store.commit('setTafseerNames', tafseerNames)
        },
        async getTafseerOfAhyah(store, data) {
            try {
                const { currentSuraNum, currentAhyahNumInSurah, currentAhyahNum, tafseerId } = store.state
                const tafseerOfAhyahData = await get(`${urls.tafseerEndpoint}/${tafseerId}/${currentSuraNum}/${currentAhyahNumInSurah}`);
                console.log(tafseerOfAhyahData);
                const getAhyah = await get(`${urls.ayahEndpoint}/${currentAhyahNum}`)
                store.commit('setTafseerOfAhyah', tafseerOfAhyahData.text)
                store.commit('setCurrentSuraName', getAhyah.data.surah.name)
                store.commit('setCurrentAhyahText', getAhyah.data.text)
            } catch (error) {
                throw new Error(error.message)
            }

        },
    }
})
export default store

//https://ums.asu.edu.eg/StudentGrades

// console.log(get('https://ums.asu.edu.eg/StudentGrades'))