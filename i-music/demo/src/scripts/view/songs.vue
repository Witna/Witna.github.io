<template>
    <div>
        <Head title="歌曲列表" :show="true"></Head>
        <div class="box">
            <ul class="list">
                <li v-for="(song,i) in songs" :key="i" @click="getSong(song.musicname)">
                    <img :src="require('../../assets/songs/'+song.img)" alt=""><span><p>{{song.musicname}}</p><p>{{song.name}}</p></span>
                    <i class="iconfont" v-html="icon" ></i>
                </li>
               
            </ul>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from "vuex";

export default {
    data(){
        return {
            icon:"&#xe675;",
            
        }
    },
    methods:{
        getSong(name){
            localStorage.step= 1;
            this.$router.push({name:"song",params:{musicname:name},query:{list:0}})
        }
    },
    computed:{
        ...mapState(['songs'])
    }
}
</script>
<style lang="scss" scoped>
.box{
    height: 91%;
    overflow-y:scroll;
    .list{
        width: 94%;
        margin:auto;
        padding-top:20px;
        li{
            width: 100%;
            height: 140px;
            border-radius:5%;
            background-color: rgb(250, 228, 228);
            margin-bottom:20px;
            
            img{
                display: inline-block;
                margin:20px 30px;
                width: 100px;
                height: 100px;
                border-radius:5px;
            }
            span{
                margin:20px 50px;
                display: inline-block;
                vertical-align: top;
                line-height: 50px;
                 font-size: 24px;
            }
            i{
                float:right;
                margin:20px 20px;
                width: 80px;
                height: 80px;
                font-size: 80px;
                color:gray;
                line-height: 80px;
                
            }
            
        }
    }
}
</style>

