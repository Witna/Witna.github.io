<template>
    <div v-if="newSinger.length>0">
        <Head :title="newSinger[0].singer" :show="true"></Head>
        <div class="box">
            <div class="box1">
                <img :src="require('../../assets/singers/'+newSinger[0].img)" alt="">
                <span><h4>{{newSinger[0].singer}}</h4><h5>{{newSinger[0].sex}}</h5><p>{{newSinger[0].style}}</p><p>收录歌曲：  {{count}}</p></span>
            </div>
            <ul class="song" >
                <li v-for="(singerSong,i) in singerSongs" :key="i" @click="getSong(singerSong.musicname,newSinger[0].singer)">
                    <div><h4>{{singerSong.musicname}}</h4><h5>{{singerSong.singer}}</h5></div>
                     <i class="iconfont" v-html="icon.icon"></i>
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
            icon:{icon:"&#xe675;"},
        }
    },
    methods:{
        ...mapActions(['getAllsong']),
        getSong(name,singer){
            localStorage.step= 1;
            this.$router.push({name:"song",params:{musicname:name},query:{list:3,singerName:singer}})
        }
    },
    computed:{
        count(){
            return this.singerSongs.length;
        },
       ...mapGetters(['newSinger']),
       ...mapGetters(['singerSongs']),
        ...mapState(['songs']),

        
       
        
    },
    created(){
        this.getAllsong({url:'http://39.97.96.166:1810/vue/allsong'});
        this.$http.get("http://39.97.96.166:1810/vue/allsinger"
        ).then(res=>{
            
            this.$nextTick(()=>{
              this.$store.dispatch("getSingers",res.body.result)
               
                // Indicator.close();
            })
        });
        
       
    },
    mounted(){
         
        this.$store.dispatch("getSinger",this.$route.params.singerName);
       

    },
    // updated(){
    //     this.$store.dispatch("getSinger",this.$route.params.singerName);
    // }

    
}
</script>
<style lang="scss" scoped>
.box{
    height: 91%;
    overflow-y:scroll;
    .box1{
        width: 100%;
        background-color: rgba(24, 24, 24, 0.61);
        border-bottom:1px solid #ccc;

        img{
            display: inline-block;
            margin:20px 30px;
            width: 40%;
            height: 300px;
            border-radius:10px;
        }
        span{
            width: 46%;
            margin:20px 5px;
            display: inline-block;
            vertical-align: top;
            line-height: 46px;
            font-size: 24px;
            color:#ddd;
            h4{
                margin-top:20px;
                margin-bottom:20px;
                font-size: 50px;
                // color:rgb(51, 48, 48);
            }
            p{
                width: 100%;
                margin-top:10px;
                font-size: 30px;
                // color:rgb(51, 48, 48);
            }
        }
        
    }
    .song{
        width: 100%;
        background-color:rgb(248, 240, 240) ;
        li{
            width: 90%;
            padding:2% 5%;
            border-bottom:1px solid rgb(231, 229, 229);
            p{
                display: inline-block;
                line-height: 100px;
                font-size: 40px;
            }
            div{
                margin:10px 30px;
                display: inline-block;
                vertical-align: top;
                line-height: 50px;
                font-size: 24px;
                h4{
                    font-size: 36px;
                }
            }
            .iconfont{
                float:right;
                margin:20px 10px;
                width: 50px;
                height: 50px;
                font-size:50px ;
                line-height: 50px;
            }
        }
        
    }
}
</style>



