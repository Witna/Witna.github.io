<template>
    <div>
        <Head title="评论" :show="true"></Head>
         <div id="middle">
            <div class="middle1 middle-center cl ">
                <textarea ref="msg" class="usertel" type="text" placeholder="请输入评论" autofocus="autofocus"></textarea>
                <select  ref="opt" value="" >
                    <option value="" v-if="usercar.length!=0">请选择已收藏的歌曲</option>
                     <option value="" v-if="usercar.length==0">无收藏歌曲哦~</option>
                    <option :value="list.songId" v-for="(list,i) in usercar" :key="i">{{list.musicname}}</option>
                    <!-- <option value="">逆战2</option>
                    <option value="">逆战3</option>
                    <option value="">逆战44444</option> -->
                </select>
                <p ref="tip" class="tip">{{tip}}</p>
                <div class="btn">
                    <div class="commitBtn" @click="commit()">提交</div>
                    <div class="exitBtn" @click="quxiao()">取消</div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from "vuex";
import { MessageBox } from 'mint-ui';

export default {
    data(){
        return {
            tip:"",
        }
    },
    computed:{
        ...mapState(['usercar'])
    },
    methods:{
        commit(){
            if(this.$refs.msg.value==""||this.$refs.opt.value==""){
                this.tip = "请填写完整信息！";
            }else{
                var msg = this.$refs.msg.value;
                var songId = this.$refs.opt.value;
                var userId = localStorage._id;
                var nickname = localStorage.nickname;
                var str = "-"
                var time = new Date();
                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                var day = time.getDate();
                var hour = time.getHours()>9?time.getHours():"0"+time.getHours();
                var min = time.getMinutes()>9?time.getMinutes():"0"+time.getMinutes();
                var sec = time.getSeconds()>9?time.getSeconds():"0"+time.getSeconds();
                var nowTime= year + str + month + str + day + " " + hour + ":" + min + ":" + sec;
        

                this.$http.get("http://39.97.96.166:1810/vue/talkmsg",{
                    params:{
                        msg,
                        songId,
                        userId,
                        nowTime,
                        nickname
                    }
                }).then(res=>{
                    if(res.body.code==404){
                        MessageBox.alert(res.body.msg, "提示");
                    }else{
                        MessageBox.alert(res.body.msg).then(action => {
                        this.$router.go(-1);
                        })                    
                    }
                })
            }
        },
        quxiao(){
            this.$router.go(-1);
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

<style scoped>
#middle{
    width: 100%;
   
    padding-top:20px;
}
.middle-center{
    width:90%;
    
    background-color: #fff;
    margin:auto;
    
}
.middle-center textarea{
    width: 100%;
    margin:auto;   
    border:2px solid #ccc;
    height: 200px;
    border-radius:5px;
    font-size: 26px;
    line-height: 40px;
}
.middle-center select{
   margin-top:30px;
}
.middle-center .btn{
    text-align: center;
}
.middle-center .btn div{
    margin-top:50px;
    display:inline-block;
    width: 30%;
    height: 60px;
    background-color: #f1384b;
    text-align: center;
    line-height: 60px;
    border-radius:10px;
    color:#fff;
    font-size: 36px;
}
.middle-center .btn .commitBtn{
    background-color: rgb(63, 238, 180);
}
.tip{
    display: block;
    color:red;
    height: 50px;
}
</style>
