<template>
    <div>
        <Head title="收藏歌单" :show="true"></Head>
        <div class="box">
            <ul class="list" v-if="usercar.length!=0">
                <li v-for="(song,i) in usercar" :key="i" >
                    <img :src="require('../../assets/songs/'+song.img)" alt=""><span><p>{{song.musicname}}</p><p>{{song.name}}</p></span>
                    <i class="iconfont iconfont1" v-html="icon" @click="getSong(song.musicname,1)"></i>
                    <i class="iconfont" v-html="icon1" @click="quxiao(song.songId)"></i>
                </li>               
            </ul>
            <h2 v-if="usercar.length==0">还未有收藏歌曲哦~~~</h2>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from "vuex";
import { MessageBox } from 'mint-ui';

export default {
     data(){
        return {
            icon:"&#xe675;",
            icon1:"&#xe622;"
        }
    },
    methods:{
        getSong(name){
            localStorage.step= 1;
            this.$router.push({name:"song",params:{musicname:name},query:{list:1}})
        },
        quxiao(id){
            
            let userId = localStorage._id;
            let songId = id;
            MessageBox.confirm('确定取消收藏吗？').then(action=>{
                
                this.$http.get("http://39.97.96.166:1810/vue/quxiao",{
                    params:{
                        userId,
                        songId
                    }
                }).then(res=>{
                   
                    if(res.body.code==404){
                        MessageBox.alert(res.body.msg, "提示");
                    }else{                        
                        MessageBox.alert(res.body.msg).then(action => {
                            window.location.reload();
                        })
                    }                                   
                                        
                })
            })
            
        }
    },
    computed:{
        // ...mapState(['songs']),
        ...mapState(['usercar']),
    },
    created(){
            let userId = localStorage._id;
            this.$http.get("http://39.97.96.166:1810/vue/usercar",{
                params:{
                    userId,
                }
            }).then(res=>{
                
                this.count=  res.body.result.length;
                this.$store.dispatch('usercar',res.body.result);  

            })
        }
}
</script>

<style lang="scss" scoped>
.box{
    height: 91%;
    overflow-y:scroll;
    h2{
        font-size:40px;
        color:#aaa;
    }
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
            .iconfont1{
                font-size: 60px;
            }
            
        }
    }
}
</style>
