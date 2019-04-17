<template>
    <mt-tabbar>
      <mt-tab-item v-for="(foot,i) in foots" :key="i">
        <router-link :to="{name:foot.name}">
          <i class="iconfont" v-html="foot.icon"></i>
          <span>{{foot.txt}}</span>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
</template>
<script>
export default {
  data() {
    return {
      foots: [
        {
          txt: "推荐",
          path: "/index/suggest",
          name: "suggest",
          icon: "&#xe67b;"
        },
        { txt: "排行", path: "/index/order", name: "order", icon: "&#xe549;" },
        {
          txt: "论坛",
          path: "/index/talk",
          name: "talk",
          icon: "&#xe67e;"
        },
        { txt: "我的", path: "/index/mine", name: "mine", icon: "&#xe659;" }
      ]
    };
  }
};
</script>
<style lang="css" scoped>
.mint-tabbar > .mint-tab-item.is-selected{
    background-color: rgb(248, 240, 240) !important;
}
a{
    color:rgb(119, 118, 118);
    /* height: 80px; */
    display:flex;
    flex-direction: column;
    justify-content: center;

}
.iconfont {
    display:block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 45px ;
    margin-top:5px;
}
span{
    display:block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 24px;
}
.router-link-exact-active,.router-link-active{
    color:#f1384b;
}
</style>


