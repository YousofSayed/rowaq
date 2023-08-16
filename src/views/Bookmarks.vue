<template>
    <div id="bookmarks">
        <div class="box" v-for="(bookmark, index) in bookmarks" :key="index" >
            <div class="content" :ahya="bookmark.ahya" :currentSuraNum="bookmark.currentSuraNum" @click="goToBookmark">
                <div class="suraName">{{ bookmark.suraName }}</div>
                <span class="text">{{ bookmark.text }}</span>
                <span class="suranum">{{ bookmark.ahya }}</span>
            </div>
            <div class="bookmarkIcon" v-html="bookmarkFill"></div>
            <div class="xMark" :id="bookmark.id" v-html="xMark" @click="deleteBookMark"></div>
        </div>
    </div>
</template>
<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { coll } from '../modules/indexedDB'
import iconsC from '../modules/icons';
import { $, addClickClass } from '../modules/cocktail';
export default {
    setup() {
        const { bookmarkFill, xMark } = iconsC;
        const { dispatch, commit } = useStore();
        const { push } = useRouter();
        const bookmarks = ref([]);
        const getBookmarks = async () => {
            const bmksRes = await (await coll).find();
            bookmarks.value = bmksRes;
        }
        getBookmarks();

        const goToBookmark = async (e) => {
            addClickClass(e);
            const target = e.currentTarget,
                currentSuraNum = target.getAttribute('currentSuraNum');

            const currentBookmark = await (await coll).findOne({
                text: target.children[1].textContent,
            });

            push('/QuranPage');
            dispatch('getAhyas', currentSuraNum);
            commit('setCurrentSuraName', `${target.children[0].textContent}`)
            commit('setSelectClass', target.getAttribute('ahya'));
            commit('changeCurrentBookmark', currentBookmark)
        }

        const deleteBookMark = async (e) => {
            addClickClass(e);
            const target = e.currentTarget;
            const dataDel = await (await coll).deleteOne({ id: target.id });
            bookmarks.value = dataDel;
        }
        return { bookmarks, bookmarkFill, xMark, goToBookmark, deleteBookMark }
    }
}
</script>
<style></style>