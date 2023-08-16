<template>
    <Header />
    <section id="mainsec">
        <section id="mainContent">
            <Popup/>
            <Notfication/>
            <router-view></router-view>
        </section>
        <Nav />
    </section>
</template>
<script>
import Header from "../components/Header.vue";
import Nav from '../components/Nav.vue';
import Popup from "../components/Popup.vue";
import Notfication from '../components/Notfication.vue'
import { onMounted} from 'vue'
import {useRouter} from 'vue-router'
export default {
    components: { Header, Nav, Popup ,Notfication },
    setup(props) {
        const router = useRouter();
        onMounted(()=>router.push('/'))
        return {}
    }
}
</script>