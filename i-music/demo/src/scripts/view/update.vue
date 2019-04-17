<template>
    <div>
        <Head title="昵称" :show="true"></Head>
        <div id="middle">
        <div class="middle1 middle-center cl ">
            原昵称：<span>{{nickname}}</span>
            <!-- <input ref="nickname" class="nickname" type="text" :placeholder="nickname" disabled> -->
            <input ref="newNickname" class="new-nickname" type="text" placeholder="请输入新的昵称" autofocus="autofocus">
             <p ref="tip" class="tip">{{tip}}</p>
            <div class="loginBtn" @click="update()">立即修改</div>
        </div>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';

export default {
    data(){
        return {
            tip:"",
            nickname:"",
        }
    },
    methods:{
        update(){
            if(this.$refs.newNickname.value==""){
                this.tip = "请输入完整信息";
            }else{
                this.$http.get("http://39.97.96.166:1810/vue/update",{
                    params:{
                        _id:localStorage._id,
                        nickname:this.$refs.newNickname.value
                    }
                }).then(res=>{
                   if(res.body.code!=200){
                        MessageBox.alert(res.body.msg, "提示");
                    }else{
                        MessageBox.alert(res.body.msg).then(action => {  
                            localStorage.nickname  = this.$refs.newNickname.value;  
                            this.$router.go(-1);
                        })
                    }
                })
            }
        }
    },
    mounted(){
        this.nickname=localStorage.nickname;
    }
}
</script>

<style scoped>
#middle{
    width: 100%;
   
    padding-top:40px;
}
.middle-center{
    width:80%;
    
    background-color: #fff;
    margin:auto;
    
}
.middle1 .register{
    font-size: 36px;
    float:right;
}
.middle1 .register a{
    font-size: 36px;
}
.middle-center input{
    width: 100%;
    margin:auto;
    margin-top:50px;
    border:none;
    border:1px solid #ccc;
    height: 80px;
    font-size: 24px;
}
.middle-center div{
    margin:auto;
    margin-top:50px;

    width: 40%;
    height: 80px;
    background-color: #f1384b;
    text-align: center;
    line-height: 76px;
    border-radius:10px;
    color:#fff;
    font-size: 40px;
}

.tip{
    display: block;
    color:red;
    height: 50px;
}

</style>

