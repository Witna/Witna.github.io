<template>
  <mt-header :title="title">
    <div v-if="show" @click="goBack" slot="left" class="div-left">
      <mt-button class="comeback">
          <i class="iconfont search-icon" v-html="icon2"></i>
          </mt-button>
    </div>
    <div v-if="!show" slot="left" class="div-left">
      <mt-button>
        <i class="iconfont" v-html="icon"></i>
      </mt-button>
    </div>
    <mt-button  slot="right" @click="goSearch" class="search-icon" >
        <i class="iconfont search-icon" v-html="icon1"></i>
    </mt-button>
  </mt-header>
</template>

<script>
export default {
  data() {
    return {
      icon: "&#xe624;",
        icon1:"&#xe643;",
        icon2:"&#xe611;"
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goSearch() {
      this.$router.push({ name: "search" });
    }
  },
  mounted() {
  },
  props: ["title", "show"]
};
</script>
<style scoped>
.mint-header {
  background-color: #f1384b;
  height: 9%;
  /* line-height: 8%; */
  color: 20px;
  font-size: 40px;
}
.mint-header .comeback{
  font-size: 20px;
}
.div-left,.mint-header .mint-button {
  width: 80px;
  height: 100px;
}
.iconfont {
  display: block;
  margin-top: 4px;
  font-size: 80px;
}
.search-icon .mintui-search{
    font-size: 40px !important;
}
.search-icon{
    font-size: 50px;
}

</style>


