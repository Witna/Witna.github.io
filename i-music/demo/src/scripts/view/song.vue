<template>
    <div v-if="newSong.length>0">
        <song-Head :title="newSong[0].musicname" :show="true"></song-Head>
        <div class="box">

            <mt-swipe class="banner1" :auto="0">
                <mt-swipe-item class="banner1-item">               
                    <div class="show1">
                    <div class="box-top"><img :src="img" alt=""></div>
                    <div class="box-center">
                        <h2>{{newSong[0].musicname}}</h2>
                        <h3>{{newSong[0].name}}</h3>
                    </div>
                    <div class="song-time">
                    
                        <p class="now-time" >{{nowtime|dateForMat}}</p>
                        <div class="line">
                            <div ref="lineTime" class="line-time"></div>
                            <div ref="cirlTime" class="cirl-time"></div>
                        </div><p class="all-time">{{alltime|dateForMat}}</p>               
                    </div>
                </div> 
                </mt-swipe-item>
                <mt-swipe-item class="banner1-item">               
                    <div class="show2">
                        <ul id="songlrc" ref="songUl">
  	        		        <li ref="songlrc" v-for="(word,i) in songlrc" :key="i">{{word}}</li>
  	        	        </ul>
                    </div> 
                </mt-swipe-item>
            </mt-swipe>




            
            
            <div class="box-bottom"> 
                <i class="iconfont iconfont1 iconfont7" v-html="icon.icon1" @click="circle()" v-if="!style"></i>
                <i class="iconfont iconfont1 " v-html="icon.icon7" @click="circle()" v-if="style"></i>

               
                <i class="iconfont iconfont2" v-html="icon.icon2" v-if="list==0" @click='goPrev(songs,newSong[0].musicname,0)'></i>
                <i class="iconfont iconfont2" v-html="icon.icon2" v-if="list==1" @click='goPrev(usercar,newSong[0].musicname,1)'></i>
                <i class="iconfont iconfont2" v-html="icon.icon2" v-if="list==2" @click='goPrev(orderSong,newSong[0].musicname,2)'></i>
                <i class="iconfont iconfont2" v-html="icon.icon2" v-if="list==3" @click='goPrev(singerSongs,newSong[0].musicname,3,newSong[0].name)'></i>
                <i class="iconfont iconfont2" v-html="icon.icon2" v-if="list==4" @click='goPrev(songlist,newSong[0].musicname,4,newSong[0].musictype)'></i>



                <i class="iconfont iconfont3" v-html="icon.icon3" v-if="!show" @click="play()"></i>
                <i class="iconfont iconfont3" v-html="icon.icon4" v-if="show" @click="pause()"></i>
                
                <i class="iconfont iconfont2" v-html="icon.icon5" v-if="list==0" @click='goNext(songs,newSong[0].musicname,0)'></i>
                <i class="iconfont iconfont2" v-html="icon.icon5" v-if="list==1" @click='goNext(usercar,newSong[0].musicname,1)'></i>
                <i class="iconfont iconfont2" v-html="icon.icon5" v-if="list==2" @click='goNext(orderSong,newSong[0].musicname,2)'></i>
                <i class="iconfont iconfont2" v-html="icon.icon5" v-if="list==3" @click='goNext(singerSongs,newSong[0].musicname,3,newSong[0].name)'></i>
                <i class="iconfont iconfont2" v-html="icon.icon5" v-if="list==4" @click='goNext(songlist,newSong[0].musicname,4,newSong[0].musictype)'></i>


                <i class="iconfont iconfont6" v-html="icon.icon6" v-if="shou" @click="shoucang(newSong[0]._id,newSong[0].musicname,newSong[0].name,newSong[0].img)"></i>
                <i class="iconfont iconfont6 iconfont8 " v-html="icon.icon8" v-if="!shou" @click="quxiao(newSong[0]._id)"></i>
                
            </div>
             
        <audio ref="myAudio" :src="'http://39.97.96.166/audios/'+newSong[0].audio" @ended="ended()" autoplay :loop="style" @canplay="allTime()" @timeupdate="nowTime()"></audio>
              
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';

import {mapState,mapActions,mapGetters} from "vuex";


export default {
    
    data(){
        return {
            // nowtime:"00:00",
            alltime:"00:00",
            nowtime:"00:00",
            // showTime:true,
            ctime:null,
            show:true,
            style:false,
            shou:true,
            icon:{
                icon1:"&#xe736;",
                icon2:"&#xe750;",
                icon3:"&#xe675;",
                icon4:"&#xe64c;",
                icon5:"&#xe751;",
                icon6:"&#xe649;",
                icon7:"&#xe639;",
                icon8:"&#xe622;",
            },
            // video:"38du.mp3",
            // video:require("../../assets/images/38du.m4a"),
            img:require("../../assets/images/song.jpg"),
            list:this.$route.query.list,
            count:1,
        }
    },
    filters:{
        dateForMat(value){
            if (!value) {
            return value;
            }
            let min = value/60|0;
            let sec = value%60|0;
            min = min>9?min:"0"+min;
            sec = sec>9?sec:"0"+sec;
            return min+":"+sec
        }       
    },
    watch:{
        ctime(oldval){       
            if(this.suiyi){             
                for(var i=1;i<this.suiyi.length-1;i++){
                    if(this.suiyi[i]<oldval&&this.suiyi[i+1]>oldval){
                        this.$refs.songlrc[i].className="active";

                                
                        let lih = -(this.$refs.songlrc[1].clientHeight);
                        this.$refs.songUl.style.WebkitTransform = "translate3d(0,"+lih*(i-1)+"px,0)"
                              
                    }else{
                        this.$refs.songlrc[i].className="";
                    }

               
                }
            }
        }
    },
    methods:{
        ...mapActions(['getAllsong']),
        ...mapActions(['getOrdersong']),

        nowTime(){//获取当前播放时间
            if(this.$refs.myAudio){            
                this.nowtime = this.$refs.myAudio.currentTime;
                let result=(this.nowtime/this.alltime*100).toFixed(2)+"%";
                this.$refs.cirlTime.style.left = result;
                this.$refs.lineTime.style.width =result;           
                this.ctime = this.nowtime;
            }
           
        },
        allTime(){//获取播放总时间
           
            this.alltime= this.$refs.myAudio.duration;
        },
        ended(){//播放结束，自动切换下一首
             localStorage.step = localStorage.step*1+1;
            let num =0;
            let count = this.$route.query.list;
            let usercar = [];
            if(count==0){
                usercar = this.songs.concat([]);
            }else if(count==1){
                usercar = this.usercar.concat([]);
            }else if(count==2){
                usercar = this.orderSong.concat([]);
            }else if(count==3){
                usercar = this.singerSongs.concat([]);
            }else if(count==4){
                usercar = this.songlist.concat([]);
            }
            console.log(usercar);
            for(var i in usercar){
               
               if(usercar[i]['musicname'] == this.$route.params.musicname&&i!=(usercar.length-1)){
                   num = i*1+1;
                   break;
               }
            }
            console.log(num);
            let music = usercar[num]['musicname'];
            if(count==3){
                this.$router.push({name:'song',params:{musicname:music},query:{list:count*1,singerName:this.$route.query.singerName}})
            }else if(count==4){
                this.$router.push({name:'song',params:{musicname:music},query:{list:count*1,songType:this.$route.query.songType}})
            }else{
                this.$router.push({name:'song',params:{musicname:music},query:{list:count*1}})
            }
            
            // window.location.reload();

        } ,        
        play(){
            this.show=!this.show;
            this.showTime=!this.showTime;
            this.$refs.myAudio.play();
            
        },
        pause(){
            this.show=!this.show;
            this.$refs.myAudio.pause();

        },
        circle(){

            this.style=!this.style;
        },
        shoucang(id,musicname,name,img){
            if(localStorage._id){
                this.shou=!this.shou;
                var userId = localStorage._id;
                var songId = id;
                var musicname = musicname;
                var name = name;
                var img = img;

                this.$http.get("http://39.97.96.166:1810/vue/songcar",{
                    params:{
                        userId,
                        songId,
                        musicname,
                        name,
                        img
                    }
                }).then(res=>{
                   
                    if(res.body.code==404){
                        MessageBox.alert(res.body.msg, "提示");
                    }else{
                         MessageBox.alert(res.body.msg).then(action => {})
                    }                                   

                })
            }else{
                MessageBox.confirm('您还未登陆，是否先登录！').then(action => {
                    this.$router.push({name:'login'})
                })
            }
            

        },
        quxiao(id){
            
            let userId = localStorage._id;
            let songId = id;
            MessageBox.confirm('确定取消收藏吗？').then(action=>{
                this.shou=!this.shou;
                this.$http.get("http://39.97.96.166:1810/vue/quxiao",{
                    params:{
                        userId,
                        songId
                    }
                }).then(res=>{
                    
                    if(res.body.code==404){
                        MessageBox.alert(res.body.msg, "提示");
                    }else{
                         MessageBox.alert(res.body.msg).then(action => {})
                    }                                   
                                        
                })
            })
            
        },
        goPrev(usercar,name,count,singer){
            localStorage.step = localStorage.step*1+1;
            console.log(usercar);
            console.log(name);
            let num = usercar.length-1;
            for(var i in usercar){
               
               if(usercar[i]['musicname'] == name&&i!=0){
                   num = i*1-1;
                   break;
               }
            }
            console.log(num);
            let music = usercar[num]['musicname'];
            if(count==3){
                this.$router.push({name:'song',params:{musicname:music},query:{list:count*1,singerName:singer}})
            }else if(count==4){
                this.$router.push({name:'song',params:{musicname:music},query:{list:count*1,songType:singer}})
            }else{
                this.$router.push({name:'song',params:{musicname:music},query:{list:count*1}})
            }

            // this.$router.push({name:'song',params:{musicname:music},query:{list:count*1}})
            
            // window.location.reload();
        },
        goNext(usercar,name,count,singer){
            console.log(usercar)
            localStorage.step = localStorage.step*1+1;
            let num =0;
            for(var i in usercar){
               
               if(usercar[i]['musicname'] == name&&i!=(usercar.length-1)){
                   num = i*1+1;
                   break;
               }
            }
            console.log(num);
            let music = usercar[num]['musicname'];
            if(count==3){
                this.$router.push({name:'song',params:{musicname:music},query:{list:count*1,singerName:singer}})
            }else if(count==4){
                this.$router.push({name:'song',params:{musicname:music},query:{list:count*1,songType:singer}})
            }else{
                this.$router.push({name:'song',params:{musicname:music},query:{list:count*1}})
            }
            
            // window.location.reload();
        }
    },
    computed:{
        songlrc:function(){
			 var geci =[];
			 var re = /\[[^[]+/g;
             var lrc= this.newSong[0].lyric.match(re);
			for(var i=1;i<lrc.length;i++){
                var onelrc = lrc[i];
                var word =onelrc.split("]")[1];
                if(word!=" "){
                    geci.push(word);        
                }
                
                
            }
           
			return geci;
        },
        suiyi:function(){
			 var geci =[];
             var re = /\[[^[]+/g;
             var lrc= this.newSong[0].lyric.match(re);
			for(var i=1;i<lrc.length;i++){
                var word = lrc[i].split("]")[1];
                if(word!=" "){
                    var onelrc = lrc[i].split(".")[0].split("[")[1]; 
                    var onest = onelrc.split(":")[0]*60+onelrc.split(":")[1]*1;
                    geci.push(onest);         
                }
                      
            }
           
			return geci;
        },


        ...mapGetters(['newSong']),
        ...mapState(['usercar']),
        ...mapState(['orderSong']),
        ...mapState(['songs']),
        ...mapGetters(['singerSongs']),
        ...mapGetters(['songlist']),
        ...mapGetters(['newType']),

        

    },
    
    mounted(){
        this.$store.dispatch('getSong',this.$route.params.musicname);



         this.$http.get("http://39.97.96.166:1810/vue/getOrder",{
            params:{
                musicname:this.$route.params.musicname
            }
        }).then((res)=>{
        })
        
    },
    created(){
        this.getAllsong({url:'http://39.97.96.166:1810/vue/allsong'});

        let userId = localStorage._id;
        this.$http.get("http://39.97.96.166:1810/vue/usercar",{
            params:{
                userId,
            }
        }).then(res=>{
            
            this.count=  res.body.result.length;
            this.$store.dispatch('usercar',res.body.result);  
        });

        this.getOrdersong({url:"http://39.97.96.166:1810/vue/orderSong"});
        this.$store.dispatch("getSinger",this.$route.query.singerName);
        this.$http.get("http://39.97.96.166:1810/vue/allsinger").then(res=>{
            this.$nextTick(()=>{
                this.$store.dispatch("getSingers",res.body.result)
                             
            })
        });
        this.$store.dispatch('getSongtype',this.$route.query.songType);
       
    },
    
   
}
</script>
<style lang="scss" scoped>
.box{
    height: 91%;
    .banner1 {
        width: 100%;
        height: 950px;
    }
    
    .show1{
        width: 100%;
        height: 950px;
        .box-top{
            width: 100%;
            padding-top:80px;
            background-color: #f8f8f8;
        img{
            width: 100%;
        }
        }
        .box-center{
            width: 100%;
            height: 200px;
            padding-top:50px;
            background-color: #f8f8f8;
            text-align: center;
            border-radius: 0 0 50% 50%;
            h2{
                font-size: 46px;
            }
            h3{
                margin-top:30px;
                font-size: 30px;
            }
        }
        .song-time{
            height: 100px;
            padding:0 5%;
            line-height: 100px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;        
            .line{
                display:inline-block;
                margin-top:48px;
                width: 60%;
                height: 4px;
                background-color: #ddd;
                position: relative;
                .line-time{
                    width: 0;
                    height: 4px;
                    background-color: #f1384b;
                    position: absolute;
                    top:-1px;
                    left:0;
                }
                .cirl-time{
                    width: 20px;
                    height: 20px;
                    background-color: #f1384b;
                    border-radius:50%;
                    position: absolute;
                    top:0;
                    left:0;
                    margin-top:-8px;
                }
            }

        }
    }
    .show2{
        width: 100%;
        height: 950px;
        // overflow-y:scroll;
        background-color: #504e4e;
        position: relative;
        #songlrc{
	        width: 100%;
	        text-align: center;
	        color: white;
	        font-size: 30px;
            margin-top:30px;
            margin-bottom:50px;
            position: absolute;
            left:0;
            top:35%;
            transition: .3s;
            li{
	            padding-top: 20px;
            }
            .active{
	            color: #00ffff;
                // position: fixed;
                // top:400px;
               
            }
            
        }
    }
    
    .box-bottom{
        width: 100%;
        height: 200px;
        line-height: 200px;
        display:flex;
        flex-direction: row;
        justify-content:space-around;
        color:#f1384b;
        i{
            font-size: 50px;
        }
        .iconfont2{
            font-size: 70px;
        }
        .iconfont3{
             font-size: 100px;
        }
        .iconfont6{
            font-size: 60px;
        }
        .iconfont7{
           font-size: 58px;
        }
        .iconfont8{
            color:#ddd;
        }
       
        
    }
}
</style>



