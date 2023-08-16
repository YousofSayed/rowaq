<template>
    <div id="study">
        <div class="selection">
            <div class="box">
                <select id="surat" v-model="modelsState.surat">
                    <option :value="null" disabled>اختر سوره</option>
                    <option v-for="(sura, index) in surat" :key="index" :value="+sura.index">{{ sura.titleAr }}</option>
                </select>

            </div>
            <div class="box">
                <select id="" v-model="modelsState.readerName">
                    <option :value="null" disabled>اختر صوت القارئ</option>
                    <option v-for="(readersName, index) in readersNames" :key="index" :value="readersName.identifier">{{
                        readersName.name }}</option>
                </select>
            </div>

            <div class="box">
                <div class="subBox">
                    <input type="text" id="from" v-model="modelsState.from" placeholder="من" @input="transformToNumInput">
                </div>
                <div class="subBox">
                    <input type="text" id="to" v-model="modelsState.to" placeholder="الي" @input="transformToNumInput">
                </div>
                <div class="subBox">
                    <input type="text" id="repeat" v-model="modelsState.repeat" placeholder="تكرار" @input="transformToNumInput">
                </div>
            </div>
            <button @click="(e) => invokeClk(e, modelsState.from, modelsState.to)">بدء</button>
            <button class="playAndBuse" @click="playAndPauseAudio" v-show="localState.showPlayAndPauseBtn"  v-html="localState.isPlay ? iconsC.pause : iconsC.play"></button>
            <!-- <div class="box"></div> -->
        </div>

        <div class="box" v-html="localState.ahyahText"></div>

        <!-- </div> -->
    </div>
</template>
<script>
import { ref } from 'vue';
import urls from '../modules/urls';
import { addClickClass, get , transformToNumInput} from '../modules/cocktail';
import surat from '../assets/jsons-files/surat.json'
import iconsC from '../modules/icons'
export default {
    setup() {
        const readersNames = ref([]);
        const readerNameModel = ref(null);
        const audio = new Audio();

        const getReadersNames = async () => {
            try {
                const res = await get(urls.readersNames);
                if (res.code == 200) {
                    readersNames.value = res.data;
                }
            } catch (error) {
                throw new Error(error.message)
            }

        }
        getReadersNames();


        const localState = ref({
            showAudio: null,
            audioSrc: null,
            ahyahText: `يوصي عند الحفظ بإستماع الشيخ الحصري رحمه الله.`,
            from_Cache: null,
            to_Cache: null,
            isPlay:null,
            showPlayAndPauseBtn:false,
        })

        const modelsState = ref({
            surat: null,
            readerName: null,
            from: null,
            to: null,
            repeat: null,
        })


        const getSuraAudio = async (targetAhyaNum) => {
            try {
                return targetAhyaNum ? {
                    res: await get(`${urls.ayahEndpoint}/${modelsState.value.surat}:${targetAhyaNum}`),
                    code: 200
                } : {
                    res: await get(`${urls.surahEndpoint}/${modelsState.value.surat}`),
                    code: 201
                };
            } catch (error) {
                throw new Error(error.message)
            }

        }

        const invokeClk = async (e, from, to, repeat) => {
            addClickClass(e);
            if (!modelsState.value.readerName && modelsState.value.surat) return;
            if (modelsState.value.from && !modelsState.value.to) return;
            if (modelsState.value.to && !modelsState.value.from) return;
            localState.value.showPlayAndPauseBtn = true;
            //getSuraAudio
            const res = await getSuraAudio(from);
            if (res.code == 201) {
                localState.value.from_Cache = modelsState.value.from = 1;
                localState.value.to_Cache = modelsState.value.to = res.res.data.numberOfAyahs;
                playFromTo(modelsState.value.from);
            } else if (res.code == 200) {
                localState.value.from_Cache = modelsState.value.from;
                localState.value.to_Cache = modelsState.value.to ;
                playFromTo(modelsState.value.from);
            }
        }

        const playFromTo = async (from) => {
            const res = await getSuraAudio(from);
            const globalAhyahNum = await res.res.data.number;
            localState.value.ahyahText = `<span>${res.res.data.text}</span><span class="suranum">${res.res.data.numberInSurah}</span>`
            const src = await get(`${urls.ayahEndpoint}/${globalAhyahNum}/${modelsState.value.readerName}`);
            if (src.code == 200) {
                audio.src = src.data.audio;
                playAudio();

            }
        }

        const playAudio = () => {
            audio.load();
            audio.play();
        }

        const playAndPauseAudio = (e)=>{
            addClickClass(e);
            localState.value.isPlay ? audio.pause() : audio.play();
        }

        audio.addEventListener('play', async () => {
            localState.value.isPlay = true;

        });

        audio.addEventListener('pause',()=>{
            localState.value.isPlay = false;
        })

        audio.addEventListener('ended', async () => {
            if (modelsState.value.from >= modelsState.value.to) {
                if (!modelsState.value.repeat || modelsState.value.repeat <= 0) {
                    console.log('Finally.');
                    return;
                } else if (modelsState.value.repeat) {
                    modelsState.value.repeat--;
                    modelsState.value.from = localState.value.from_Cache - 1;
                    modelsState.value.to = localState.value.to_Cache;
                }
            };
            modelsState.value.from++;
            playFromTo(modelsState.value.from)
            console.log('start again.');
        })

        return { surat, modelsState, localState, readersNames, iconsC,invokeClk, transformToNumInput,getSuraAudio,playAndPauseAudio, getReadersNames, readerNameModel }
    }
}
</script>


<style scoped></style>