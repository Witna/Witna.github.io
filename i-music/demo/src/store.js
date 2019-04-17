import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        singers:[],
        singer:"",
        songs:[],
        song:"",
        songtype:"",
        types: [
            { name: "风吹草动 动人心弦",type:"唯美", img: "gedan1.jpg" },
            { name: "优美动听民谣",type:"民族", img: "gedan2.jpg"},
            { name: "潸然泪下情歌",type:"爱情", img: "gedan3.jpg" },
            { name: "流行嗨歌",type:"流行", img: "gedan4.jpg"}
        ],
        orderSong:[],
        usercar:[],
        allTalk:[],

    },
    getters:{
        newSinger(state){
            return state.singers.filter((item,index)=>
                item.singer==state.singer)
        },
        singerSongs(state){
            return state.songs.filter((item,index)=>
                item.name==state.singer)
        },
        newSong(state){
            return state.songs.filter((item,index)=>
                item.musicname==state.song)
        },
        songlist(state){
            return state.songs.filter((item,index)=>
                item.musictype==state.songtype)
        },
        newType(state){
            return state.types.filter((item,index)=>
                item.type==state.songtype)
        }


    },
    actions:{
        getSingers({commit},result){
            
            commit("getSingers",result)
        },
        getSinger({commit},result){
           
            commit("Singer",result)
        },
        getAllsong({commit},{url}){
            Vue.http.get(url).then(res=>{
                commit('getAllsong',res.data.result)
            })
        },
        getSong({commit},result){
           
            commit("Song",result)
        },
        getSongtype({commit},result){
           
            commit("Songtype",result)
        },
        getOrdersong({commit},{url}){
            Vue.http.get(url).then(res=>{
                commit('orderSong',res.data.result)
            })
        },
        usercar({commit},result){
            commit("usercar",result)
        },
        getAlltalk({commit},{url}){
            Vue.http.get(url).then(res=>{
                commit('allTalk',res.data.result)
            })
        },

    },
    mutations:{
        getSingers(state,result){
            state.singers = result;
        },
        Singer(state,result){
            state.singer = result;
           
        },
        getAllsong(state,songs){
            state.songs = songs;
        },
        Song(state,result){
            state.song = result;
           
        },
        Songtype(state,result){
            state.songtype = result;
        },
        orderSong(state,result){
            state.orderSong = result;
        },
        usercar(state,result){
            state.usercar = result;
        },
        allTalk(state,result){
            state.allTalk = result;
        }
        
    }

})

export default store;