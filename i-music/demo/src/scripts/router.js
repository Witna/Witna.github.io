//1  配置路由

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//2  定义路由组件
import Cuide from "./view/guide.vue";
import Index from "./view/index.vue";
import Order from "./view/order.vue";
import Mine from "./view/mine.vue";
import Talk from "./view/talk.vue";
import Suggest from "./view/suggest.vue";
import Search from "./view/search.vue";
import Singers from "./view/singers.vue";
import Songs from "./view/songs.vue";
import Singer from "./view/singer.vue";
import Song from "./view/song.vue";
import Songtype from "./view/songtype.vue";
import Login from "./view/login.vue";
import Register from "./view/register.vue";
import Update from "./view/update.vue";
import Msg from "./view/msg.vue";
import Userlist from "./view/userlist.vue";


const routes = [
    {
        path:"",
        name:"guide",
        component:Cuide
    },
    {
        path:"*",
        redirect:{
            name:"suggest"
        }
    },
    {
        path:"/index",
        name:"index",
        component:Index,
        children:[
            {path:"order",name:'order',component:Order},
            {path:"mine",name:'mine',component:Mine},
            {path:"talk",name:'talk',component:Talk},
            {path:"suggest",name:'suggest',component:Suggest}
        
        ]
    },
    {
        path:"/search",
        name:"search",
        component:Search
    },
    {
        path:"/singers",
        name:"singers",
        component:Singers
    },
    {
        path:"/singer/:singerName",
        name:"singer",
        component:Singer
    },
    {
        path:"/songs",
        name:"songs",
        component:Songs
    },
    {
        path:"/song/:musicname",
        name:"song",
        component:Song
    },
    {
        path:"/songtype/:type",
        name:"songtype",
        component:Songtype
    },
    {
        path:"/login",
        name:"login",
        component:Login
    },
    {
        path:"/register",
        name:"register",
        component:Register
    },
    {
        path:"/update",
        name:"update",
        component:Update
    },
    {
        path:"/msg",
        name:"msg",
        component:Msg
    },
    {
        path:"/userlist",
        name:"userlist",
        component:Userlist
    }

    
]

//3  创建  router
const router = new VueRouter({
    routes,
    mode:"hash"
})

//4  挂载到根实例
export default router;