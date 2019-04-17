
<template>
    <div>
        <Head title="论坛" :show="false"></Head>
        <div class="box">
            <div class="box-top">
                <img :src="talkimg" alt="">
            </div>
            <div class="add" >
                <i class="iconfont" v-html="icon.icon3" @click="goTalk()"></i>
            </div>
            <ul class="list">

                <li class="li" v-for="(talk,i) in allTalk" :key="i">
                    <div class="person">
                        <div class="person-left">
                            <img :src="img" alt="">
                        </div>
                        <div class="person-right">
                            <h2>{{talk.nickname}}</h2> 
                            <p>{{talk.nowTime}}</p>
                        </div>  
                        <div class="hand" v-if="loginPhone==talk.userId" @click="deleteTalk(talk._id)">
                            <i class="iconfont" v-html="icon.icon4"></i>
                           
                        </div>                     
                    </div>
                    <div class="content">
                        {{talk.msg}}
                    </div>
                    <div class="song" @click="getSong(talk.result.musicname)">
                        <img :src="require('../../assets/songs/'+talk.result.img)" alt=""><span><p>{{talk.result.musicname}}</p><p>{{talk.result.name}}</p></span>
                        <i class="iconfont" v-html="icon.icon2"></i>
                    </div>
                    
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script>
import { MessageBox } from 'mint-ui';

import {mapState,mapActions,mapGetters} from "vuex";

    export default {
        data(){
            return {
                loginPhone:localStorage._id,
                talkimg:require("../../assets/images/talk.jpg"),
                icon:{
                    icon1:"&#xe501;",
                    icon2:"&#xe675;",
                    icon3:"&#xe602;",
                    icon4:"&#xe75f;",
                },
                img:require("../../assets/images/guide1.jpg"),
                
            }
        },
        computed:{
            ...mapState(['allTalk'])
        },
        methods:{
            goTalk(){
                if(localStorage._id){
                    this.$router.push({name:'msg'});
                }else{
                    MessageBox.confirm('您还未登陆，是否先登录！').then(action => {
                        this.$router.push({name:'login'})
                    })
                }
               
            },
            ...mapActions(['getAlltalk']),
            getSong(name){
                localStorage.step= 1;
                this.$router.push({name:"song",params:{musicname:name}})
            },
            deleteTalk(id){
                MessageBox.confirm('确定删除此条评论吗？').then(action=>{
                    let _id=id;
                this.$http.get("http://39.97.96.166:1810/vue/deleteTalk",{
                    params:{
                        _id,                        
                    }
                }).then(res=>{                    
                    if(res.body.code==404){
                        MessageBox.alert(res.body.msg, "提示");
                    }else{
                        MessageBox.alert(res.body.msg).then(action => {})
                        window.loaction.reload();
                    }                                   
                                        
                })
            })
            }
        },
        created(){
            this.getAlltalk({url:'http://39.97.96.166:1810/vue/allTalk'})
        }
    };
</script>
    
    <style lang="scss" scoped>
        .box {
            height: 91%;
            overflow-y:scroll;
            .box-top{
                width: 100%;
                
                img{
                    width: 100%;
                }
            }

            .add{
                height: 80px;
                font-size: 24px;
                position: relative;
                i{
                    position: absolute;
                    top:-45px;
                    right:30px;
                    width: 80px;
                    height: 80px;
                    font-size: 80px;
                    line-height: 80px;
                    color:rgb(255, 0, 0);
                    background-color: #fff;
                    border-radius:50%;
                }
            }
            .list{
                width: 94%;
                margin:auto;
                padding-top:20px;
                padding-bottom:140px;
                .li{
                    width: 100%;

                    border-radius:5px;
                    // background-color: rgb(250, 246, 246);
                    margin-bottom:20px;
                    padding-bottom:40px;
                    padding-top:40px;
                    border-bottom:2px solid #ccc;
                    .person{
                        width: 96%;
                        margin:auto;
                        overflow: hidden;
                        .person-left{
                            float:left;
                            width: 80px;
                            height: 80px;
                            border-radius:50%;
                            overflow: hidden;
                            img{
                                width: 100%;
                            }                            
                        }
                        .person-right{
                            float:left;
                            h2{                           
                                margin-left:20px;
                                font-size: 36px;                            
                            }
                            p{
                                display: inline-block;
                                margin-top:5px;
                                margin-left:20px;
                                font-size: 24px;
                                color:#ccc;
                            }                            
                        }
                        .hand{
                            float:right;
                            // margin-right:20px;
                            width: 50px;
                            height: 50px;
                            i{
                                display: block;
                                width: 80px;
                                height: 80px;
                                font-size: 50px;
                                line-height: 80px;
                                color:rgb(167, 161, 166);
                            }
                        }

                        
                        
                    }
                    .content{
                        width: 83%;
                        margin-left:15%;
                        margin-top:30px;
                        margin-bottom:20px;
                        line-height: 40px;
                        color:rgb(90, 89, 89);
                        font-size: 30px;
                    }
                    .song{
                        width: 80%;
                        margin-left:15%;
                        margin-top:30px;
                        border-radius:5px;
                        background-color: rgb(236, 234, 234);
                        
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
                            margin:30px 30px;
                            width: 80px;
                            height: 80px;
                            font-size: 80px;
                            color:gray;
                            line-height: 80px;
                        }
                    }
                }

            }
        }
</style>