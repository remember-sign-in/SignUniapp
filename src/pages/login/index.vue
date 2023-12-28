<template>
  <div class="container">
    <!-- <div class="row">
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
            </div> -->

    <uni-popup ref="popup" background-color="#fff" @change="change">
        
        <view class="con">
                <view class="list" style="top: 10vh;">
                <view class="row">
                    <view >昵称</view>
                    <switch @change="changeNick" checked />
                </view>
                <view class="row">
                    <view >头像</view>
                    <switch @change="changeAva" />
                </view>
                <view class="row">
                    <button @tap="auth" style="width: 50%" type="primary" class="text">授权登录</button>
                </view>
            </view>
        </view>
    </uni-popup>
  </div>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import  useLoginStore from "@/store/Login/index";
import Login from '@/services/login/index'
import guard from '@/permission.js'
const loginStore = useLoginStore();
const popup = ref(null);
let Info = ref({});
let authChoice = ref({
    nickName: true,
    avatarUrl: true,
})
const changeNick = (e) =>{
    let val = e.target.value;
    authChoice.value.nickName = val;
}
const changeAva = (e) =>{
    let val = e.target.value;
    authChoice.value.avatarUrl = val;
}
const auth = () =>{
    wx.login({
        success: async(res)=>{
            console.log(res.code)
            let {data} = await Login.login(res.code)
            //设置用户id
            wx.getUserInfo({
                provider: "weixin",
                withCredentials: true,
                success: ({ userInfo}) => {
                let obj = {
                    ...data,
                    ...userInfo
                }
                loginStore.setInfo(obj);
                let userid = loginStore.getUserInfo();
                uni.navigateBack({
                    delta:1,
                })
    
                
            },
                fail: (error) => {console.log(error)}
            })
        },
        fail:(err) =>{
            console.log(err)
        }
    })
}
onLoad(() => {
    setTimeout(()=>{
        popup.value.open("bottom");
    },100)
});

// import { ref } from 'vue';
// import guard from '@/permission'
// import {useLoginStore} from '@/store/Login/index'
// import { onLoad } from '@dcloudio/uni-app';
// import  Login from '@/services/login/index'

// const loginStore = useLoginStore()
// const loginForm = ref({
//     accout:'',
//     pwd:'',
// })
// const login = async(form = loginForm.value) =>{
//     let code;
//     const getToken = () =>{
//         return new Promise((resolve,reject)=>{
//                 resolve(3)
//             wx.login({
//                 success:async (res)=>{
//                     code = res.code;
//                     data = await Login.login(code)
//                     console.log(data);
//                     resolve(data);
//                 },
//                 fail: (err)=>{
//                     console.log('失败了')
//                     reject(err);
//                 }
//             })
//         })
//     }
//     await getToken();
//      const {id,token} = data.data;
//      loginStore.setToken(token.trim());
//      loginStore.setId(id.trim());
//      guard();
// }
// const register = () =>{
//     uni.navigateTo({
//         url: '/pages/register/register_13'
//     })
// }
// onLoad(()=>{
//     console.log(Login)
//     guard();
// })
</script>
<style lang="scss">
.con{
    height: 40vh;

}
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: fit-content;
  width: 100vw;
  .row {
    padding: 15px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
