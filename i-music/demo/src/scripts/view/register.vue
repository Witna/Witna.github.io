<template>
    <div>
        <Head title="注册" :show="true"></Head>
        <div id="middle">
            <div class="middle1 middle-center cl ">
                <input ref="phone" class="usertel" type="text" placeholder="请输入手机号" autofocus="autofocus">
                <input ref="userpwd" class="userpwd" type="password" placeholder="请输入密码">
                <input ref="confirmpwd" class="confirmpwd password" type="password" placeholder="再次输入密码6~12位">
                <p ref="tip" class="tip">{{tip}}</p>
                <div class="loginBtn" @click="register()">立即注册</div>
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
        }
    },
    methods:{
        register(){
            let phone= this.$refs.phone.value;
            let userpwd = this.$refs.userpwd.value;
            let confirmpwd = this.$refs.confirmpwd.value;
            if(phone==""||userpwd==""||confirmpwd==""){
                this.tip="请输入完整信息";
            }else{
                let phoneReg = /^1[3-9][0-9]{9}$/g;
                if(!phoneReg.test(phone)){
                    this.tip="请输入正常的手机号";
                }else{
                    if(userpwd!=confirmpwd){
                        this.tip="两次密码不一致";
                    }else{
                        if(userpwd.length < 6 || userpwd.length > 12){
                            this.tip="密码格式不正确";
                        }else{
                            this.tip="";
                            this.$http.get("http://39.97.96.166:1810/vue/zhuce",{
                                params:{
                                    phone,
                                    userpwd
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
                    }
                }
            }
        }
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
.tip{
    display: block;
    color:red;
    height: 50px;
}
</style>
