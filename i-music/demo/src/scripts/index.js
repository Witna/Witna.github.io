console.log("vue 主函数 模块+ webpack 模块化编程 ");

import Vue from "vue";
import MintUI from "mint-ui";
Vue.use(MintUI);

import VueResource from "vue-resource";
Vue.use(VueResource);


Vue.component("myHead",{
    template:"<h2>head-  head - 1810</h2>"
})

// 全局注册 
import Head from "./component/head.vue";
Vue.component("Head",Head);

import router from "./router";

import store from "../store";

import songHead from './component/songHead.vue';
Vue.component('songHead',songHead);


const vm = new Vue({
    router,
    store,
    data:{
       
    }
}).$mount("#app")