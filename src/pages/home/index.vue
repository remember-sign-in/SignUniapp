<template>
    <view>
        <view>
            <uni-easyinput prefixIcon="search" v-model="searchContent" placeholder="啦啦啦" @iconClick="iconClick">
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
            <uni-card :title="item.name"  :extra="item.numbers+'人'"
                thumbnail="/static/logo.png" >
                <view class="sub-Container">邀请码:{{ item.joinCode }}
                    <view class="subFun">
                        <button @tap="startSign(item.id)">发起签到</button>
                        <button @tap="toRecord(item.id)">签到记录</button>
                        <button @tap="toClass(item.id)">班级管理</button>
                    </view>
                </view>
            </uni-card>
        </view>
    </view>
</template>
   

<script setup>
import { ref, } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import home from '@/services/home/index'
import guard from '@/permission.js'
//const let 
const options = [
    { name: '我创建的' },
    { name: '我加入的' },
]

//ref reactive
const id = ref(1);
const activeBtIndex = ref(0)
const searchContent = ref('');
const cardList = ref([
    {
        index:1,
        name:'操作系统',
        numbers: '41人',
        joinCode: '123',
        id:"12"
    },
    {
        index:2,
        name:'操作系统',
        numbers: '40人',
        joinCode: '123',
        id:"12"
    },
])

//请求处理 ------------------------
//我创建的
const getCreateList = async() =>{
    const res = await home.getCreateList(id.value)
    cardList.value = res.data.items
}
//我加入的
const getJoinList = async() =>{
    const res = await home.getJoinList(id.value)
    cardList.value = res.data.items
}

//逻辑函数 ------------------------
//
const changeIndex = (index) => {
    activeBtIndex.value = index;
    if(index === 0){
        getCreateList()
    }
    else {
        getJoinList()
    }
}
//凭借字符串
const joinString = (str1, str2) => {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
        return str1 + str2;
    }
}
//发起签到
const startSign = (id) => {
    console.log('not finish');
}
//跳转班级管理
const toClass = (id) => {
    uni.navigateTo({
	url: `/pages/class/index?id=${id}`
})
}
//跳转班级签到记录
const toRecord = (id) =>{
    uni.navigateTo({
        url: `/pages/record/classRecord?id=${id}`
    })
}
//Onload
onLoad(async () => {
    guard()
    getCreateList()
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
        font-weight: 500;
        font-size: 80%;
    }
}

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
</style>