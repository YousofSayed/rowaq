<template>
    <div id="books">
        <Selection :dbName="localState.dbName" :firstOptName="localState.firstOptName" @getBooksOrVideos="getBooksOrVideos" />
        <div class="box" v-show="localState.message">
            {{ localState.message }}
        </div>
    </div>
</template>
<script>
import { getData, tb } from '../modules/db';
import { ref } from 'vue';
import Selection from '../components/Selection.vue';
export default {
    components: { Selection },
    setup() {
        const localState = ref({
            dbName: 'Books',
            firstOptName: 'اختر الكتاب',
            ifrSrc: null,
            message:null
        });


        const getBooksOrVideos = async (fileIdAsModel) => {
            const fileUrl = await (await tb.compressURL(fileIdAsModel.url))?.normalUrl;
            localState.value.ifrSrc = fileUrl;
            localState.value.message = `تم تحميل ${fileIdAsModel.name} بإسم ${fileUrl.split('/').at(-1)} بنجاح.`
            let a = document.createElement('a');
            a.href = fileUrl;
            document.body.append(a);
            a.click();
            a.remove();

        }
        return { localState, getBooksOrVideos }
    }
}
</script>
