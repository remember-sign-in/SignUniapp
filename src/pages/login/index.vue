<template>
	<div class="container">
    <div class="row">
        <input
            class="gap"
            style="padding:10px; background: white; height: 30px; border-radius: 30px;"
            v-model="loginForm.accout"
            placeholder="输入账号"
            placeholder-class="input-placeholder"
        />
    </div>
    <div class="row">
        <input
            class="gap"
            style="padding:10px; background: white; height: 30px; border-radius: 30px;"
            v-model="loginForm.pwd"
            placeholder="输入密码"
            placeholder-class="input-placeholder" type="password"
        />
    </div>
    <div class="row">
        <button style="margin: 15px" size="default" type="primary" @tap="register">
            注册
        </button>
        <button @tap="login" style="margin: 15px" size="default" type="primary" >
            登录
        </button>
    </div>
</div>

</template>

<script setup>
import { ref } from 'vue';
import guard from '@/permission'
import {useLoginStore} from '@/store/Login/index'
import { onLoad } from '@dcloudio/uni-app';
import Login from '@/services/login/index'
const loginStore = useLoginStore()
const loginForm = ref({
    accout:'',
    pwd:'',
})
const login = async(form = loginForm.value) =>{
    let code;
    let data = {
        data:{
            id:"4",
            token:"2"
        }
    };
    const getToken = () =>{
        return new Promise((resolve,reject)=>{
                resolve(3)
            // wx.login({
            //     success:async (res)=>{
            //         code = res.code;
            //         data = await Login.login(code)
            //         resolve(data);
            //     },
            //     fail: (err)=>{
            //         reject(err);
            //     }
            // })
        })
    }
    await getToken();
     const {id,token} = data.data;
     loginStore.setToken(token.trim());
     loginStore.setId(id.trim());
     guard();
}
const register = () =>{
    uni.navigateTo({
        url: '/pages/register/register_13'
    })
}
onLoad(()=>{
    guard();
})
</script>
<style lang="scss">
.gap {
	margin: 10px;
}
.row {
	display: flex;
    width: 90%;
    height: 10vh;
    margin-top: 10px;
    justify-content: center;
    button {
        width: 30%;
        height: 100%;
        border-radius: 30px;
        
    }
}

.container {
    height: 80vh;
    position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>