<template>
    <div class="selection">
        <div class="box">
            <select id="sections" v-model="modelsState.Sections" @change="getMaterials">
                <option :value="null" disabled>المرحله</option>
                <option v-for="(section, index) in dbState.Sections" :key="index" :name="section.name"
                    :value="{ name: section.name, id: section.id }">{{ section.name }}
                </option>
            </select>
        </div>

        <div class="box">
            <select id="materials" v-model="modelsState.Materials" @change="geVideos">
                <option :value="null" disabled>الماده</option>
                <option v-for="(Material, index) in dbState.Materilas" :key="index"
                    :value="{ name: Material.name, id: Material.id }">
                    {{ Material.name }}</option>
            </select>
        </div>

        <div class="box">
            <select id="videos" v-model="modelsState.VideosOrBooks" @change="getBooksAndView">
                <option :value="null" disabled>{{ firstOptName }}</option>
                <option v-for="(videoOrBook, index) in dbState.VideosOrBooks" :key="index"
                    :value="{ id: videoOrBook.id, url: videoOrBook.url_id, name: videoOrBook.name }">{{ videoOrBook.name }}
                </option>
            </select>
        </div>

    </div>
</template>
<script>
import { ref, } from 'vue';
import { getData, } from '../modules/db'

export default {
    props: ['dbName', 'firstOptName', 'getBooksOrVideos'],
    setup(props, { emit }) {

        const dbState = ref({
            Sections: null,
            Materilas: null,
            VideosOrBooks: null,

        })

        const modelsState = ref({
            Sections: null,
            Materials: null,
            VideosOrBooks: null,
        })

        //Functions
        const getSections = async () => {
            const res = await getData({
                dbName: 'Sections',
            });
            if (res.results) {
                dbState.value.Sections = await res.results;
            } else {
                console.log(res.message);
                getSections();
            }
        }
        getSections();

        const getMaterials = async (e) => {
            const res = await getData({
                dbName: 'Materials',
                query: `where={"id":"${modelsState.value.Sections.id}"}`
            });
            if (res.results) {
                dbState.value.Materilas = res.results;
            } else {
                console.log(res.message);
                getMaterials();
            }
        }

        const geVideos = async () => {
            const res = await getData({
                dbName: props.dbName,
                query: `where={"section":"${modelsState.value.Sections.name}","material":"${modelsState.value.Materials.name}","id":"${modelsState.value.Materials.id}"}`
            })
            if (res.results) {
                dbState.value.VideosOrBooks = res.results;
            } else {
                console.log(res.message);
                geVideos();
            }
        }

        const getBooksAndView = async () => {
            emit('getBooksOrVideos', modelsState.value.VideosOrBooks)
        }

        return { modelsState, dbState, getMaterials, geVideos, getBooksAndView, }
    }

}
</script>