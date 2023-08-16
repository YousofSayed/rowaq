<template>
    <div id="lectures">
        <Selection :dbName="localState.dbName" :firstOptName="localState.firstOptName" @getBooksOrVideos="updateVideo"/>
        <div class="boxs">
            <div class="box" v-show="localState.showFrame">
                <iframe id="iframeYtb" :src="localState.mainSrc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;    web-share"  allowfullscreen crossorigin></iframe>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import Selection from '../components/Selection.vue';
import icons from '../modules/icons';

export default {
    components:{Selection},
    setup() {
        const { xMark, arrowLeft, arrowRight } = icons;

        const localState = ref({
            mainSrc : null,
            showFrame:false,
            dbName:'Videos',
            firstOptName:'المحاضره'
        })


        const updateVideo = (urlModel)=>{
            localState.value.mainSrc = `https://www.youtube-nocookie.com/embed/`;
            localState.value.mainSrc += urlModel.url.split(/\//ig).at(-1) + '?modestbranding=1&;showinfo=0&;autohide=1&;rel=0;"';
            localState.value.showFrame = true; 
        }

        
        return { xMark, arrowLeft, arrowRight, localState,updateVideo }
    }

}
</script>