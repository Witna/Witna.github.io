<template>
    <div>
         <router-view id="indexbox"></router-view>
        
        <Foot></Foot>
    </div>
</template>
<script>
import Foot from "../component/foot.vue";

export default {
    components:{
        Foot,
    }
}
</script>
