<template>
    <div v-if="songlist.length!=0">
        <Head :title="this.$route.params.type" :show="true"></Head>
         <div class="box">
            <div class="order-header">
                <img :src="require('../../assets/images/'+newType[0].img)" alt="">
                <dl>
                    <dt>宛转悠扬.绕梁三日</dt>
                    <dd>声动梁尘</dd>
                    <dd>余音回旋不绝</dd>
                </dl>
            </div>
            <ul class="list">
                <li v-for="(songli,i) in songlist" :key="i" @click="getSong(songli.musicname,songli.musictype)">
                    <img :src=" require('../../assets/songs/'+songli.img)" alt=""><span><p>{{songli.musicname}}</p><p>{{songli.name}}</p></span>
                    <i class="iconfont" v-html="icon" ></i>
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
            // type: [
            //     { name: "风吹草动 动人心弦",type:"唯美", img: require("../../assets/images/gedan1.jpg") },
            //     { name: "优美动听民谣",type:"民族", img: require("../../assets/images/gedan2.jpg")},
            //     { name: "潸然泪下情歌",type:"爱情", img: require("../../assets/images/gedan3.jpg") },
            //     { name: "流行嗨歌",type:"流行", img: require("../../assets/images/gedan4.jpg")}
            // ],
            // singers: [
            //     { name: "张杰", img: require("../../assets/singers/zhangjie.jpg") },
            //     { name: "周杰伦", img: require("../../assets/singers/zhoujielun.jpg") },
            //     { name: "李荣浩", img: require("../../assets/singers/lironghao.jpg") },
            //     { name: "李荣浩", img: require("../../assets/singers/lironghao.jpg") }
            //     ],
            icon:"&#xe675;",
        };
    },
    methods:{
        getSong(name,style){
            localStorage.step= 1;
            this.$router.push({name:"song",params:{musicname:name},query:{list:4,songType:style}})
        }
    },
    computed:{
        ...mapGetters(['newType']),
        ...mapGetters(['songlist']),
        
    },
    mounted(){
        this.$store.dispatch('getSongtype',this.$route.params.type);
    }
}
</script>
<style lang="scss" scoped>
.box{
    height: 91%;
    overflow-y:scroll;
    .order-header{
        width: 100%;
        height: 360px;
        background-color:rgba(0,0,0,.7);
        img{
            // width: 40%;
            height: 86%;
            width: auto;
            float: left;
            margin-top: 25px;
            margin-left: 25px;
            border-radius: 50%;
        }
        dl{
            float: left;
            color: #ddd;
            margin-top: 25px;
            margin-left: 60px;
            dt{
                margin-top: 50px;
                font-size: 34px;
                line-height: 40px;
            }
            dd{
                margin-top: 50px;
                font-size: 34px;
                line-height: 30px;
            }
        }
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


