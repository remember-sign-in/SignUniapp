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
        <view>
            <uni-easyinput prefixIcon="search" v-model="searchContent" placeholder="按照姓名/学号搜索学生" @iconClick="iconClick">
            </uni-easyinput>
        </view>
        <view class="stuList" v-for="(item, index) in studList" :key="index">
            <uni-card :title="item.stuName" :sub-title="joinString(joinString('班级:', item.stuclass,),joinString('——学号:', item.stunumbers,))" :extra="item.numbers"
                 @tap="onClick">
                <button @tap="startSign" class="fuckout">踢出班级</button>
            </uni-card>
        </view>
    </view>
</template>
<script setup>

const studList = ([
    {
        
        stuName: '周建辉',
        stunumbers: '20210020216516',
        stuclass: '计算机五班1',
    },
    {
        stuName: '周建辉',
        stunumbers: '20210020216512',
        stuclass: '计算机五班1',
    },
    {
        stuName: '周建辉',
        stunumbers: '20210020216512',
        stuclass: '计算机五班1',
    },
    {
        stuName: '周建辉',
        stunumbers: '20210020216512',
        stuclass: '计算机五班1',
    },
    {
        stuName: '周建辉',
        stunumbers: '20210020216512',
        stuclass: '计算机五班1',
    }
])
const classlist ={
    courseName: '软件工程1',
    className: '计算机五班1',
    classtime: '周一 1-2节',
    count: '123',
    classpicture: '/static/logo.png'
}

const joinString = (str1, str2) => {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
        return str1 + str2;
    }
}
</script>

<style lang="scss">

.top{
    height:80px;
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
.fuckout{
    background-color: rgb(214, 223, 247);
    &:active{
        background-color: rgb(160, 176, 222);
    }
}
</style>