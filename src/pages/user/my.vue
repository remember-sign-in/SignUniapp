<template>
    <view>
        <view class="top">
            <img :src="userInfo.avaUrl" alt="" class="pictrue">
            <view class="data">
                <view>昵称: {{userInfo.nickName}}</view>
                <view>学号: {{userInfo.number}}</view>
                <view>班级: {{userInfo.class}}</view>
            </view>
            
            <navigator class="change" url="changedata_14"> </navigator>
            
        </view>
        <view class="compose">
            <view class="content">
                <img src="/static/我的信息.png" alt="" class="pictrue1">
                <text>我的信息</text>
                <button class="smallbutton"></button>
            </view>
            <view class="content">
                <img src="/static/我的班级.png" alt="" class="pictrue1">
                <text>我的班级</text>
                <button class="smallbutton"></button>
            </view>
            <view class="content">
                <img src="/static/班级公告.png" alt="" class="pictrue1">
                <text>班级公告</text>
                <button class="smallbutton"></button>
            </view>
            <view class="content">
                <img src="/static/客服.png" alt="" class="pictrue1">
                <text>在线客服</text>
                <button class="smallbutton"></button>
            </view>
            <view class="content">
                <img src="/static/公告.png" alt="" class="pictrue1">
                <text>系统公告</text>
                <button class="smallbutton"></button>
            </view>
            <view class="content">
                <img src="/static/设置.png" alt="" class="pictrue1">
                <text>设置</text>
                <button class="smallbutton"></button>
            </view>
        </view>
        <view class="logout">
            <button @tap="logout">退出登录</button>
        </view>
		
    </view>
</template>

<script setup>
import { onLoad,onShow } from "@dcloudio/uni-app";
import { ref ,reactive} from "vue";
import Record from "@/services/class/index";
import  useLoginStore  from "@/store/Login/index";
const loginStore = useLoginStore();
let userInfo = ref({})
const logout = () =>{
    loginStore.logout();
}
onLoad(()=>{
    userInfo.value = loginStore.getAll();
    console.log(userInfo.value)
   
})

</script>

<style lang="scss">
    .top{
        height:100px;
        width: 100%;
        background-color: rgb(191, 209, 243);
        // 行排列
        display: flex;
        flex-direction: row;
        .pictrue{
        height: 80px;
        width: 80px;
        margin-left: 20px;
        margin-top: 10px;
        border-radius: 50%;
        }
        .data{
            margin-top: 15px;
            margin-left: 10px;
            
            flex-direction: column;
            justify-content: space-around;
        }
        .change{
        height: 30px;
        width: 30px;
        background-image: url("/static/edit-编辑.png");
        align-self: center;
        background-size: cover;
        margin-left: 50px;
        }
    }
    .compose{
        height: 100%;
        width: 100%;
        background-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        // 左右居中
        align-items: center;
        margin-top: 40px;
    }
    .content{
        margin-top: 2px;
        height: 40px;
        width: 90%;
        background-color: rgb(255, 255, 255);
        // 行排列;
        display: flex;
        flex-direction: row;
        text{
            align-self: center;
            margin-left: 10px;
        }
        .pictrue1{
        height: 30px;
        width: 30px;
        align-self: center;
        }
        .smallbutton{
        height: 30px;
        width: 30px;
        background-color: white;
        background-image: url("/static/向右箭头.png");
        align-self: center;
        background-size: cover;
        float: right;
        margin-right: 10px;
        }
    }
    .logout{
        width: 80%;
        margin-top: 10px;
        // 左右居中
        margin-left: 10%;
    }
</style>