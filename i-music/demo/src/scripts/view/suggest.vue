<template>
  <div>
    <Head title="音乐库" :show="false"></Head>
    <div class="box">
      <mt-swipe class="banner1" :auto="3000">
        <mt-swipe-item class="banner1-item" v-for="(img,i) in imgs" :key="i">
          <router-link :to="{name:'song',params:{musicname:img.musicname},query:{list:0}}" >
          <img :src="img.img" alt class="banner1-img">
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
      <div class="opt1">
        <div class="opt1-top">
          <h2 class="opt1-name">歌手推荐</h2>
          <router-link :to="{name:road.road1}"><span class="opt1-more">更多</span></router-link>
        </div>
        <ul class="opt1-list">
         
          <li v-for="(singer,i) in singers" :key="i" @click="getSinger(singer.name)">
             <!-- <router-link :to="{name:'singer',params:{name:singer.name}}"> -->
                <img v-lazy="singer.img" alt>
                <p>{{singer.name}}</p>
             <!-- </router-link> -->
            
          </li>
        </ul>
      </div>
      <div class="opt2">
        <div class="opt2-top">
          <h2 class="opt2-name">热门歌曲</h2>
          <router-link :to="{name:road.road2}"><span class="opt2-more">更多</span></router-link>
        </div>
        <ul class="opt2-list">
          <li v-for="(song,i) in songs" :key="i" @click="getSong(song.name)">
            <!-- <router-link :to="{name:'song',params:{musicname:song.name}}">             -->
            <img v-lazy="song.img" alt>
            <p>{{song.name}}</p>
            <!-- </router-link> -->
          </li>
        </ul>
      </div>
      <div class="opt3">
        <div class="opt3-top">
          <h2 class="opt3-name">热门歌单</h2>
          <!-- <router-link :to="{name:road.road2}"><span class="opt3-more">更多</span></router-link> -->
        </div>
        <ul class="opt3-list">
          <li v-for="(songLi,i) in songlist" :key="i">
            <router-link :to="{name:'songtype',params:{type:songLi.type}}">
            <img v-lazy="songLi.img" alt>
            <p>{{songLi.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
    
<script>
console.log(88888);
import { Indicator } from 'mint-ui';
import {mapState,mapActions,mapGetters} from "vuex";

export default {
  data() {
    return {   
      road:{
        road1:"singers",
        road2:"songs",
      } ,        
      imgs: [
        {img:require("../../assets/images/banner1.jpg"),musicname:"逆战"},
        {img:require("../../assets/images/banner2.jpg"),musicname:"不将就"},

        {img:require("../../assets/images/banner3.jpg"),musicname:"逆战"},

        {img:require("../../assets/images/banner4.jpg"),musicname:"红尘客栈"},
        {img:require("../../assets/images/banner5.jpg"),musicname:"不将就"},
        {img:require("../../assets/images/banner6.jpg"),musicname:"三生三世"},
        {img:require("../../assets/images/banner7.jpg"),musicname:"红尘客栈"},
        {img:require("../../assets/images/banner8.jpg"),musicname:"三生三世"},

        // require("../../assets/images/banner2.jpg"),
        // require("../../assets/images/banner3.jpg"),
        // require("../../assets/images/banner4.jpg"),
        // require("../../assets/images/banner5.jpg"),
        // require("../../assets/images/banner6.jpg"),
        // require("../../assets/images/banner7.jpg"),
        // require("../../assets/images/banner8.jpg")
      ],
      singers: [
        { name: "张杰", img: require("../../assets/singers/zhangjie.jpg") },
        { name: "周杰伦", img: require("../../assets/singers/zhoujielun.jpg") },
        { name: "李荣浩", img: require("../../assets/singers/lironghao.jpg") }
      ],
      songs: [
        { name: "逆战", img: require("../../assets/songs/nizhan.jpg") },
        {
          name: "红尘客栈",
          img: require("../../assets/songs/hongchenkezhan.jpg")
        },
        { name: "不将就", img: require("../../assets/songs/bujiangjiu.jpg") },
        {
          name: "三生三世",
          img: require("../../assets/songs/shanshengshanshi.jpg")
        }
      ],
      songlist: [
        { name: "风吹草动 动人心弦",type:"唯美", img: require("../../assets/images/gedan1.jpg") },
        {
          name: "优美动听民谣",type:"民族",
          img: require("../../assets/images/gedan2.jpg")
        },
        { name: "潸然泪下情歌",type:"爱情", img: require("../../assets/images/gedan3.jpg") },
        {
          name: "流行嗨歌",type:"流行",
          img: require("../../assets/images/gedan4.jpg")
        }
      ]
      
    };
  },
  methods:{
    getSong(name){
            localStorage.step= 1;
            this.$router.push({name:"song",params:{musicname:name},query:{list:0}})
        },
    getSinger(singerName){
            
           
            this.$router.push({name:'singer',params:{singerName:singerName}})
        },

      ...mapActions(['getAllsong'])
  },
  created(){
    // Indicator.open({
    //         text:'加载中...',
    //         spinnerType:'triple-bounce'
    //     });
        this.$http.get("http://39.97.96.166:1810/vue/allsinger"
        ).then(res=>{
            
            this.$nextTick(()=>{
              this.$store.dispatch("getSingers",res.body.result)
               
                // Indicator.close();
            })
        });
        
        this.getAllsong({url:'http://39.97.96.166:1810/vue/allsong'})



    
  }
};
</script>
    
<style lang="scss" scoped>
.box{
    height: 91%;
    overflow-y:scroll;
}
.banner1 {
  margin: auto;
  margin-top: 20px;
  width: 94%;
  height: 280px;
  .banner1-img {
    width: 100%;
    height: 100%;
  }
}
.opt1 {
  margin: auto;
  margin-top: 40px;
  width: 94%;

  .opt1-top {
    overflow: hidden;
    margin-bottom: 30px;
    .opt1-name {
      float: left;
      font-weight: 700;
      font-size: 38px;
      color: #f1384b;
    }
    .opt1-more {
      float: right;
      color: #aaa;
      font-size: 24px;
    }
  }
  .opt1-list {
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
.opt2 {
  margin: auto;
  margin-top: 40px;
  
  
  width: 94%;
  .opt2-top {
    overflow: hidden;
    margin-bottom: 30px;
    .opt2-name {
      float: left;
      font-weight: 700;
      font-size: 38px;
      color: #f1384b;
    }
    .opt2-more {
      float: right;
      color: #aaa;
      font-size: 24px;
    }
  }
  .opt2-list {
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      width: 45%;
      img {
        width: 100%;
        border-radius: 5px;
      }
      p {
            font-size: 24px;
            line-height: 70px;
            text-align: center;
      }
    }
  }
}
.opt3 {
  margin: auto;
  margin-top: 40px;
  margin-bottom:130px;
  
  width: 94%;
  .opt3-top {
    overflow: hidden;
    margin-bottom: 30px;
    .opt3-name {
      float: left;
      font-weight: 700;
      font-size: 38px;
      color: #f1384b;
    }
    .opt3-more {
      float: right;
      color: #aaa;
      font-size: 24px;
    }
  }
  .opt3-list {
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      width: 49%;
      img {
        width: 100%;
        border-radius: 5px;
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