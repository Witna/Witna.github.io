<template>
    <div>
        <Head title="我的" :show="false"></Head>
        <div class="box">
            <div class="box-top">               
                    <img :src="img" alt=""><span><p class="nickname">{{nickname}}</p><p>{{phone}}</p></span>
                    <i class="iconfont" v-html="icon" @click="update()" v-if="login"></i>                  
            </div>
            <router-link :to="{name:'login'}">
            <div class="login"  v-if="!login">登陆/注册</div>
            </router-link>
            <div class="get-song" @click="gotoList()">收藏歌单({{count}})</div>
            <div class="exit" v-if="login" @click="exit()">退出</div>
        </div>
       
    </div>
</template>
    
<script>
import { MessageBox } from 'mint-ui';


    export default{
        data(){
            return {
               login:false,
               nickname:"亲，还未登陆哦！",
               phone:"",
               icon:"&#xe90e;",
               img:require("../../assets/images/guide1.jpg"),
               count:0,
            }
        },
        methods:{
            exit(){
                window.localStorage.removeItem('nickname');
                window.localStorage.removeItem('phone');
                window.localStorage.removeItem('_id');
                window.location.reload();
            },
            update(){

                this.$router.push({name:'update',params:{_id:localStorage._id}});
            },
            gotoList(){
                this.$router.push({name:'userlist'});
            }
        },

        mounted(){
            if(localStorage._id){
                this.nickname = localStorage.nickname;
                this.phone = localStorage.phone;
                this.login = true;
            }
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
        background-color: rgb(250, 228, 228);
        .box-top{
            width: 90%;
            margin:auto;
            height: 140px;
            
            background-color:#fff;
            padding:50px 5%;
            
            border-bottom:2px solid #ccc;
            
            img{
                display: inline-block;
                margin:20px 30px;
                width: 100px;
                height: 100px;
                border-radius:5%;
            }
            span{
                margin:10px 30px;
                display: inline-block;
                vertical-align: top;
                line-height: 50px;
                font-size: 24px;
                .nickname{
                    font-size: 34px;
                    margin-bottom:20px;
                }
            }
            i{
                float:right;
                margin:20px 20px;
                width: 80px;
                height: 80px;
                font-size: 50px;
                color:gray;
                line-height: 80px;
                
            }
        }
        .login{
            width: 80%;
            margin:auto;
            margin-top:20px;
            padding:30px 10%;
            font-size: 36px;
            line-height: 50px;
            text-align: left;
            background-color:#fff;
            border-bottom:2px solid #ccc;
            color:rgb(43, 42, 42);
        }
        .get-song{
            width: 80%;
            margin:auto;
            margin-top:20px;
            padding:30px 10%;
            font-size: 36px;
            line-height: 50px;
            text-align: left;
            background-color:#fff;
            border-bottom:2px solid #ccc;
            color:rgb(43, 42, 42);
        
        }
        .exit{
            width: 80%;
            margin:auto;
            margin-top:20px;
            padding:30px 10%;
            font-size: 36px;
            line-height: 50px;
            text-align: left;
            background-color:#fff;
            border-bottom:2px solid #ccc;
            color:rgb(43, 42, 42);
        }
    }   
</style>