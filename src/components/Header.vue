<template>
    <header>
        <div class="container">
            <div class="prev" v-html="arrowLeft" v-show="currentRoute != '/'" @click="goBack"></div>
            <div class="row">
                <span class="logoText"><img src="../assets//images/logoO.webp" alt=""></span>
            </div>
        </div>
    </header>
</template>

<script>
import { ref, computed} from 'vue';
import {useRoute , useRouter} from 'vue-router';
import {addClickClass} from '../modules/cocktail'
import icons from '../modules/icons';
export default {
    setup(){
        const route = useRoute();
        const router = useRouter();
        const localState = ref({
            name:'ضيف',
        })
        const currentRoute =  computed(()=>route.path);
        const {arrowLeft} = icons;
        const goBack = (e)=>{
            addClickClass(e)
            router.back();
        }
        
        return {localState,arrowLeft,currentRoute,goBack}
    }
}
</script>
