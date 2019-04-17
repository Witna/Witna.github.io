<template>
    <div>
        <Head title="登陆" :show="true"></Head>
        <div id="middle">
        <div class="middle1 middle-center cl ">
            <p class="register"><span>还没有账号？</span>
                <router-link :to="{name:'register'}">现在注册</router-link>
            </p>
            <input ref="phone" class="usertel" type="text" placeholder="请输入手机号" autofocus="autofocus">
            <input ref="userpwd" class="userpwd" type="password" placeholder="请输入密码">
            <div class="loginBtn" @click="login()">立即登录</div>
        </div>

    </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    data(){
        return {
        }
        
    },
    methods:{
        login(){
            let phone= this.$refs.phone.value;
            let userpwd = this.$refs.userpwd.value;
            this.$http.get("http://39.97.96.166:1810/vue/login",{
                params:{
                    phone,
                    userpwd
                }
            }).then(res=>{
                if(res.body.code==404){
                    MessageBox.alert(res.body.msg, "提示");
                }else{
                    MessageBox.alert(res.body.msg).then(action => {
                        localStorage.nickname = res.body.result.nickname;
                        localStorage.phone = res.body.result.phone;
                        localStorage._id = res.body.result._id;
                        this.$router.go(-1);
                    })
                    
                }
                
            })
        }
    },
   
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




</style>

