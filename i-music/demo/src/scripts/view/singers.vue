<template>
    <div>
        <Head title="歌手" :show="true"></Head>
        <div class="box">
            <ul class="list">
                <li v-for="(singer,i) in singers" :key="i" @click="getSinger(singer.singer)">
                    <!-- <router-link :to="{name:'singer',params:{name:singer.singer}}"> -->
                    <img :src="require('../../assets/singers/'+singer.img)" alt>
                    <p>{{singer.singer}}</p>
                    <!-- </router-link> -->
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';

import {mapState,mapActions,mapGetters} from "vuex";

export default {
    data(){
        return {
            // singers: [
            //     { name: "张杰", img: require("../../assets/singers/zhangjie.jpg") },
            //     { name: "周杰伦", img: require("../../assets/singers/zhoujielun.jpg") },
            //     { name: "李荣浩", img: require("../../assets/singers/lironghao.jpg") },
            //     { name: "张杰", img: require("../../assets/singers/zhangjie.jpg") },
            //     { name: "周杰伦", img: require("../../assets/singers/zhoujielun.jpg") },
            //     { name: "李荣浩", img: require("../../assets/singers/lironghao.jpg") },
            //     { name: "周杰伦", img: require("../../assets/singers/zhoujielun.jpg") },
            //     { name: "李荣浩", img: require("../../assets/singers/lironghao.jpg") },
            //     { name: "张杰", img: require("../../assets/singers/zhangjie.jpg") },
            // ],
        }
    },
    methods:{
        // ...mapActions(['getSingers']),

        getSinger(singerName){
            
            this.$router.push({name:'singer',params:{singerName:singerName}})
        },
       
    },
    computed:{
        ...mapState(['singers']),
    },
    created(){
        // Indicator.open({
        //     text:'加载中...',
        //     spinnerType:'triple-bounce'
        // });
        // this.$http.get("http://localhost:1810/vue/allsinger"
        // ).then(res=>{
        //     console.log(res);
        //     this.$nextTick(()=>{
        //         this.getSingers(res.body.result);
        //         Indicator.close();
        //     })
        // })
    }
}
</script>

<style lang="scss" scoped>
.box{
    height: 91%;
    overflow-y:scroll;
        .list {
            width: 90%;
            margin: auto;
            margin-top:60px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
        li {
            width: 30%;
            img {
                width: 100%;
                border-radius: 50%;
            }
            p {
                font-size: 24px;
                line-height: 70px;
                text-align: center;
            }
        }
    }

}
</style>
