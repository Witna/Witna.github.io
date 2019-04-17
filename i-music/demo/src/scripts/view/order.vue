<template>
    <div>
        <Head title="播放排行榜" :show="false"></Head>
        <div class="box">
            <ul class="list">
                <li v-for="(song,i) in orderSong" :key="i" @click="getSong(song.musicname)">
                    <img :src="require('../../assets/songs/'+song.img)" alt=""><span><p>{{song.musicname}}</p><p>{{song.name}}</p></span>
                    <i class="iconfont" :id="'iconfont'+(i+1)" v-html="icon" ></i>

                    <i class="num" :id="'num'+(i+1)">{{i+1}}</i>
                </li>
               
            </ul>
        </div>
    </div>
</template>
    
<script>
import {mapState,mapActions,mapGetters} from "vuex";

export default {
    data() {
        return {
            // singers: [
            //     { name: "张杰", img: require("../../assets/singers/zhangjie.jpg") },
            //     { name: "周杰伦", img: require("../../assets/singers/zhoujielun.jpg") },
            //     { name: "李荣浩", img: require("../../assets/singers/lironghao.jpg") },
            //     { name: "李荣浩", img: require("../../assets/singers/lironghao.jpg") }
            //     ],
            icon:"&#xe660;",
        };
    },
    computed:{
        ...mapState(['orderSong'])
    
    },
    methods:{
        ...mapActions(['getOrdersong']),
        getSong(name){
            localStorage.step= 1;
            this.$router.push({name:"song",params:{musicname:name},query:{list:2}})
        }
    },
    mounted() {
        
    },
    created(){
        this.getOrdersong({url:"http://39.97.96.166:1810/vue/orderSong"});
    }
};
</script>
    
<style lang="scss" scoped>
    .box{
        height: 91%;
        overflow-y:scroll;
        .list{
            width: 94%;
            margin:auto;
            padding-top:20px;
            margin-bottom:130px;
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
                #iconfont1{
                    margin-right: 30px;
                    font-size: 90px;
                    color:gold;
                    
                }
                #iconfont2{
                    color:silver;
                    margin-right: 30px;
                    font-size: 90px;
                }
                #iconfont3{
                    color:goldenrod;
                    margin-right: 30px;
                    font-size: 90px;
                }
                .num{
                    font-size: 50px;
                    color:gray;
                }
                #num1{
                    font-size: 60px;
                    color:gold;
                }
                #num2{
                    font-size: 60px;
                    color:silver;
                }
                #num3{
                    font-size: 60px;
                    color:goldenrod;
                }

            }

        }
    }

</style>