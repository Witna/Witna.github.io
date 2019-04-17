<template>
  <div>
    <mt-swipe :auto="3000">      
      <mt-swipe-item v-for="(img,i) in imgs" :key="i">
        <img :src="img" alt class="img-item">
      </mt-swipe-item>
    </mt-swipe>
    <div class="cricle-time">{{count}}s</div>
  </div>
</template>

<script>
import router from "../router";


export default {
  data() {
    return {
      imgs: [
        require("../../assets/images/guide1.jpg"),
        // require("../../assets/images/guide2.jpg"),
        // require("../../assets/images/guide3.jpg")


      ],
      count:3
    };
  },
  mounted() {
      if(localStorage.visitCount){
          localStorage.visitCount++;
      }else{
          localStorage.visitCount = 1;
      }
    var that = this;
    var num=3;
    var timer1=setInterval(function(){
      num--;
      that.count=num;

    },1000)
    var timer2=setTimeout(function() {
      that.$router.push({ name: "suggest" });
      clearInterval(timer1);
      clearTimeout(timer2);
    }, 3000);

   
  }
};
</script>

<style lang="css" scoped>
p {
  color: red;
}
mt-swipe,
.img-item {
  width: 100%;
  height: 100%;
 
}
.cricle-time{
  position: fixed;
  top:0;
  right:0;
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 24px;
  border-radius:50%;
  background-color: rgb(160, 158, 158);
  color:#fff;
  
}

</style>
