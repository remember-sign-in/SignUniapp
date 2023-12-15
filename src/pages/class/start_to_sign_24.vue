<template>
    <!-- 发起签到（还没点开始签到） -->
    <view>
        <view class="top">
            <img src="/static/logo.png" alt="" class="pictrue">
            
            <view class="cardList">
                <view>课程名：{{ classlist.courseName }}</view>
                <view>班级：{{ classlist.className }}</view>
                <view>上课时间：{{ classlist.classtime }}</view>
                <view>人数：{{ classlist.count }}</view>
            </view>
            
        </view>

        <view class="signway">
            倒计时：<uni-countdown  :show-day="false" :hour="testHour" :minute="testMinute" :second="testSecond"  />
            <text class="signcode">签到码：{{ code }}</text>
            <button class="stop">
                停止签到
            </button>
        </view>
            
        
    </view>
</template>
<script setup>
const testHour = 0;
const testMinute = 0;
const testSecond = 60;
const classlist ={
    courseName: '软件工程1',
    className: '计算机五班1',
    classtime: '周一 1-2节',
    count: '123',
    classpicture: '/static/logo.png'
}
const code="sztu"
const joinString = (str1, str2) => {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
        return str1 + str2;
    }
}
</script>

<style lang="scss">

.top{
    height:20%;
    width: 100%;
    background-color:  rgb(150, 175, 225);
    // 行排列
    display: flex;
    flex-direction: row;
    
    .pictrue{
        height: 60px;
        width:60px;
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
    .cardList{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: small;
        margin-left: 10px;
    }
    
}
.signway{
        height:80%;
        width: 100%;
        display: flex;
        background-color: rgb(255, 255, 255);
        align-items: center;
        flex-direction: column;
        margin-top: 30px;
        .signcode{
            margin-top: 20px;
            font-size: 20px;
        }
        .stop{
            
            margin-top: 20px;
            background-color: rgb(191, 209, 243);
            border-radius: 10px;
        }
    }

</style>