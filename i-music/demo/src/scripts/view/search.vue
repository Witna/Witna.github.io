<template>
    <div>
        <Head title="搜索" :show="true"></Head>
        
        <mt-search v-model="value"></mt-search>
        <ul>
            <li class="song" v-for="(singer) in newSingers" :key="singer.name" @click="getSinger(singer.singer)">
                <!-- <router-link :to="{name:'singer',params:{singerName:singer.singer}}"> -->
                <i class="iconfont iconfont1" v-html="icon.icon1"></i><span><p>{{singer.singer}}</p></span>
                <i class="iconfont iconfont2" v-html="icon.icon2"></i>
                <!-- </router-link> -->
            </li>
            <li class="song" v-for="(list,i) in newLists" :key="i" @click="getSong(list.musicname)">
                <!-- <img :src="list.img" alt=""><span><p>{{list.songname}}</p><p>{{list.singer}}</p></span>
                <i class="iconfont" v-html="icon.icon2"></i> -->
                <i class="iconfont iconfont1" v-html="icon.icon1"></i><span>{{list.musicname}}&emsp;{{list.name}}</span>
                <i class="iconfont iconfont2" v-html="icon.icon2"></i>
            </li>           
        </ul>
    </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from "vuex";

export default {
    data(){
        return {
            
            value:"",
            
            icon:{
                    icon1:"&#xe643;",
                    icon2:"&#xe90e;",
                   
            },

        }
    },
    computed:{

        newLists(){
            return this.$store.state.songs.filter((list,index)=>(list.name+list.musicname).indexOf(this.value)!=-1);
        },
        newSingers(){
            return this.$store.state.singers.filter((list,index)=>(list.singer).indexOf(this.value)!=-1);
        }
    },
    methods:{
        getSinger(singers){
            this.$router.push({name:'singer',params:{singerName:singers}});
        },
        getSong(name){
            localStorage.step= 1;
            this.$router.push({name:"song",params:{musicname:name},query:{list:0}})
        }
    }
    
    
}
</script>
<style lang="scss" scoped>
.mint-search,.mint-searchbar{
    height: 120px;
}
.mint-search-list{
    width: 0;
    height: 0;
    position: absolute;
    top:0;
    left:0;

}

ul{
    position: fixed;   
    top: 17%;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    overflow-y:scroll;
    z-index:100;
    .song{
        width: 80%;
        padding:0 10%;
        margin-top:10px;
        // background-color:rgb(248, 240, 240) ;
        border-bottom:1px solid #ccc;
        .iconfont1{
            float:left;
            margin:20px 10px;
            width: 50px;
            height: 50px;
            font-size:44px ;
            line-height: 50px;
            // color:rgb(126, 123, 123);
        }
        span{
            margin:20px 30px;
            display: inline-block;
            vertical-align: top;
            line-height: 50px;
            font-size: 24px;
            color:rgb(65, 62, 62);
        }
        .iconfont2{
            float:right;
            margin:20px 10px;
            width: 50px;
            height: 50px;
            font-size:44px ;
            line-height: 50px;
        }
    }   
}

</style>

