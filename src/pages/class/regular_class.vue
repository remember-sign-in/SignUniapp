<template>
<!-- 班级管理主页缺勤一 -->
    <view>
        <view class="options">
            <view v-for="(item, index) in options">
                <button @tap="changeIndex(index)" :class="index === activeBtIndex ? 'active' : ''">
                    {{ item.name }}
                </button>
            </view>
        </view>

        <view class="countpicture">
            

        </view>

        <view class="search">
            <uni-easyinput prefixIcon="search" v-model="searchContent" placeholder="根据学号/名字搜索学员" @iconClick="iconClick">
            </uni-easyinput>
        </view>
        
        <view class="cardList" v-for="(item, index) in cardList" :key="index">
            <uni-card :title="item.stuName" :sub-title="joinString(joinString('班级:', item.stuclass,),joinString('——学号:', item.stunumbers,))" :extra="item.numbers"
                 @tap="onClick">
                <view class="sub-Container">
                    <button @tap="startSign">补签</button>
                    <button @tap="toClass">请假</button>
                </view>
            </uni-card>
        </view>
    </view>
</template>
<script setup>
const options = [
    { name: '今日统计' },
    { name: '签到记录' },
]
const cardList = ([
    {
        
        stuName: '周建辉',
        stunumbers: '20210020216516',
        stuclass: '计算机五班1',
    },
    {
        stuName: '周建辉',
        stunumbers: '20210020216512',
        stuclass: '计算机五班1',
    }
])
const joinString = (str1, str2) => {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
        return str1 + str2;
    }
}
</script>

<style lang="scss">

.options {
    display: flex;
    flex-direction: row;

    view {
        flex: 1;
    }

    .active {
        background: lightblue;
    }
}
.countpicture{
    height: 200px;
    width: 100%;
    background-color: rgb(150, 175, 225);
    // 行排列
    display: flex;
    flex-direction: column;
}
.search{
    width: 90%;
    align-items: center;
    margin-left: 5%;
    margin-top: 10px;
}
.sub-Container {
    display: flex;
    
    align-items: center;
    
        button {
            display: flex;
            font-size: 80%;
        }
    
}
</style>