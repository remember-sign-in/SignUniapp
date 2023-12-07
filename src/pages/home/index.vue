<template>
    <view>
        <view>
            <uni-easyinput prefixIcon="search" v-model="searchContent" placeholder="左侧图标" @iconClick="iconClick">
            </uni-easyinput>
        </view>
        <view class="options">
            <view v-for="(item, index) in options">
                <button @tap="changeIndex(index)" :class="index === activeBtIndex ? 'active' : ''">
                    {{ item.name }}
                </button>
            </view>
        </view>
        <view class="cardList" v-for="(item, index) in cardList" :key="index">
            <uni-card :title="item.className" :sub-title="joinString('课程名:', item.courseName)" :extra="item.numbers"
                thumbnail="/static/logo.png" @tap="onClick">
                <view class="sub-Container">邀请码:{{ item.code }}
                    <view class="subFun">
                        <button @tap="startSign">发起签到</button>
                        <button @tap="toClass">班级管理</button>
                    </view>
                </view>
            </uni-card>
        </view>
    </view>
</template>
  
<script setup>
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import {getHomeList} from '@/services/home/index'
//const let 
const options = [
    { name: '我创建的' },
    { name: '我加入的' },
]
//ref reactive
const activeBtIndex = ref(0)
const searchContent = ref('');
const cardList = reactive([
    {
        courseName: '软件工程1',
        className: '计算机五班1',
        numbers: '41人',
        code: '123'
    },
    {
        courseName: '软件工程2',
        className: '计算机五班2',
        numbers: '40人',
        code: '123'
    },
    {
        courseName: '软件工程2',
        className: '计算机五班2',
        numbers: '40人',
        code: '123'
    },
    {
        courseName: '软件工程2',
        className: '计算机五班2',
        numbers: '40人',
        code: '123'
    },
    {
        courseName: '软件工程2',
        className: '计算机五班2',
        numbers: '40人',
        code: '123'
    },
    {
        courseName: '软件工程2',
        className: '计算机五班2',
        numbers: '40人',
        code: '123'
    },
    {
        courseName: '软件工程2',
        className: '计算机五班2',
        numbers: '40人',
        code: '123'
    },
    {
        courseName: '软件工程2',
        className: '计算机五班2',
        numbers: '40人',
        code: '123'
    }
])

//请求 ------------------------

//

//逻辑函数 ------------------------
//
const changeIndex = (index) => {
    activeBtIndex.value = index;
}
//凭借字符串
const joinString = (str1, str2) => {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
        return str1 + str2;
    }
}
//发起签到
const startSign = () => {
    console.log('not finish');
}
//跳转班级管理
const toClass = () => {
    console.log('not finish');
}

//Onload
onLoad(async () => {
    // console.log('->>>>>>>>>>>')
    const res = await getHomeList();
    console.log(res)
})

</script>
  
  
<style lang="scss">
.sub-Container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.subFun {
    display: flex;

    button {
        font-size: 80%;
    }
}

.options {
    display: flex;
    flex-direction: row;

    view {
        flex: 1
    }

    .active {
        background: lightblue;
    }
}
</style>