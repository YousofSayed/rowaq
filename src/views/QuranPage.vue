<template>
    <div id="quran" ref="page">
        <div id="basmala" v-show="currentSuraNum != 1 && currentSuraNum != 9">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</div>
        <div id="page">
            <span v-for="ahya in ahyas" :gAyahNum="ahya.number" :ahyahNumInSurah="ahya.numberInSurah" @click.prevent="doBookMark"
                @contextmenu.prevent="showPopup"><span>{{ ahya.numberInSurah == 1 && currentSuraNum != 1 ?
                    ahya.text.split('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ').join('') : ahya.text }}</span><span
                    class="suranum">{{ ahya.numberInSurah }}</span>
            </span>
        </div>
    </div>
</template>
<script>
import { $a, $, onMobile } from '../modules/cocktail.js';
import { coll } from '../modules/indexedDB'
import { ref, computed, onMounted, onUpdated } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const page = ref(null);
        const showPopup = (e) => {
            const target = e.currentTarget;
            store.commit('setCurrentAhyah', target.getAttribute('gayahnum'))
            store.commit('setCurrentAhyahNumInSurah', target.getAttribute('ahyahNumInSurah'))
            target.classList.add('selected');
            $('#popup').classList.add('show');
            $('#popup').style.top = `${e.clientY + 20}px`;
            $('#popup').style.left = `${e.clientX - 50}px`;
        };

        onUpdated(() => {
            //ahyahnuminsurah
            if (!selectedEl.value) return;
            const el = $(`#page span[ahyahnuminsurah = "${selectedEl.value}"]`);
            page.value.scrollTo(0, el.offsetTop - 100);
            el.classList.add('selected');
            setTimeout(() => {
                el.classList.remove('selected');
            }, 2000)
        })

        const ahyas = computed(() => store.state.ahyas);
        const currentSuraNum = computed(() => store.state.currentSuraNum);
        const currentSuraName = computed(() => store.state.currentSuraName);
        const selectedEl = computed(() => store.state.elSelectClass)
        const currentBookmark = computed(() => store.state.currentBookmark);

        const updateNotfication = (textContent) => {
            $('#notfication').textContent = textContent;
            $('#notfication').classList.add('show');
            setTimeout(() => { $('#notfication').classList.remove('show') }, 700)
        }

        const doBookMark = async (e) => {
            const target = e.currentTarget;
            if (currentBookmark.value) {
                updateBookmark({text:currentBookmark.value.text}, {
                    currentSuraNum: currentSuraNum.value,
                    ahyas: ahyas.value.length,
                    suraName: currentSuraName.value,
                    ahya: target.children[1].textContent,
                    text: target.children[0].textContent,
                }); return
            }


            const bookmarkData = {
                currentSuraNum: currentSuraNum.value,
                ahyas: ahyas.value.length,
                suraName: currentSuraName.value,
                ahya: target.children[1].textContent,
                text: target.children[0].textContent,
            };
            await(await coll).set(bookmarkData);

            store.commit('changeCurrentBookmark', bookmarkData)


            updateNotfication(`.تم الإضافه الي المراجع`)
        }
        const updateBookmark = async (oldQuery, newQuery) => {
            await(await coll).findOneAndUpdate(oldQuery, newQuery);
            store.commit('changeCurrentBookmark', newQuery)
            updateNotfication(`.تم تحديث المرجع`);
        }

        return {
            showPopup, doBookMark, ahyas, currentSuraNum, page
        }
    },
}
</script>