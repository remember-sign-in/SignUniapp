

<template>
    <view>
        <view class="top">
            <img src="/static/logo.png" alt="" class="pictrue">
            <button class="login" >
                登录/注册
            </button>
            <img src="/static/logo.png" alt="" class="icon">  
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
    }
    .pictrue{
        height: 80px;
        width: 80px;
        margin-left: 20px;
        margin-top: 10px;
        border-radius: 50%;
    }
    .login{
        // 居中
        margin-top: 30px;
        height: 40px;
        width: 100px;
        font-size: medium;
    }
    .icon{
        
        height: 30px;
        width: 30px;
        margin-top: 40px;
        margin-right: 20px;     
        
    }
</style>