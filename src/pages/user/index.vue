<template>
    <view>
        <view class="top">
            <img src="/static/logo.png" alt="" class="pictrue">
            <view class="data">
                <view>name</view>
                <view>myNumber</view>
                <view>myclass</view>
            </view>
            
            <button class="change"></button>
            
        </view>
        <view class="compose">
            <view class="content">
                <img src="/static/logo.png" alt="" class="pictrue1">
                <text>我的信息</text>
                <button class="smallbutton"></button>
            </view>
            <view class="content">
                <img src="/static/logo.png" alt="" class="pictrue1">
                <text>我的班级</text>
                <button class="smallbutton"></button>
            </view>
            <view class="content">
                <img src="/static/logo.png" alt="" class="pictrue1">
                <text>班级公告</text>
                <button class="smallbutton"></button>
            </view>
            <view class="content">
                <img src="/static/logo.png" alt="" class="pictrue1">
                <text>在线客服</text>
                <button class="smallbutton"></button>
            </view>
            <view class="content">
                <img src="/static/logo.png" alt="" class="pictrue1">
                <text>系统公告</text>
                <button class="smallbutton"></button>
            </view>
            <view class="content">
                <img src="/static/logo.png" alt="" class="pictrue1">
                <text>设置</text>
                <button class="smallbutton"></button>
            </view>
        </view>
        <view class="logout">
            <button>退出登录</button>
        </view>
		
    </view>
</template>

<script setup>

new view({
    data:{ myimage: "/static/logo.png",
        name: '周建辉',
        myNumber: '1023513515',
        myclass:"计算机科学与技术6班"
    }
})


</script>

<style lang="scss">
    .top{
        height:100px;
        width: 100%;
        background-color: rgb(150, 175, 225);
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
        background-image: url("/static/logo.png");
        align-self: center;
        background-size: cover;
        margin-right: 30px;
        }
    }
    .compose{
        height: 100%;
        width: 100%;
        background-color: rgb(252, 253, 254);
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
        background-color: rgb(248, 248, 248);
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
        background-image: url("/static/logo.png");
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