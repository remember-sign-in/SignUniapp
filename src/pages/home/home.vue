
<template>
  
    <view class="bar">
        <uni-easyinput  prefixIcon="search" v-model="searchContent" placeholder="啦啦啦" @iconClick="iconClick" @input="search">
        </uni-easyinput>
    </view>
    <view class="options">
        <view v-for="(item, index) in options">
            <button @tap="changeIndex(index)" :class="index === activeBtIndex ? 'active' : ''">
                {{ item.name }}
            </button>
        </view>
    </view>
    <view  class="cardList" v-for="(item, index) in tempList" :key="index">
        <uni-card :title="item.className" :sub-title="joinString('课程名:', item.courseName)" :extra="item.numbers"
            thumbnail="/static/logo.png" @tap="onClick">
            <view class="sub-Container">邀请码:{{ item.code }}
                <view class="subFun">
                    <button @tap="startSign(item.id)">发起签到</button>
                    <button @tap="toClass(item.id)">班级管理</button>
                </view>
            </view>
        </uni-card>
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
const tempList = ref([])
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
    }
])
// 搜索
const search = (val) =>{
    if(val === ""){
        tempList.value = cardList.value
        return;
    }
    const filter = (arr,ori,val) =>{
        arr.value = ori.value.filter(item=>{
            let content = item.name.toString();
            return content.includes(val);
        })
    }
    filter(tempList,cardList,val);
}

//请求处理 ------------------------
//我创建的
const getCreateList = async() =>{
         const res = await home.getCreateList(id.value)
         cardList.value = res.data.items
         tempList.value = res.data.items;
}
//我加入的
const getJoinList = async() =>{
        const res = await home.getJoinList(id.value)
        cardList.value = res.data.items
        tempList.value = res.data.items;
}

//逻辑函数 ------------------------

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

//跳转班级管理
const toClass = (id) => {
    uni.navigateTo({
	url: `/pages/class/index?id=${id}`
})
}
//Onload
onLoad(async () => {
    guard()
    getCreateList()
})

</script>
  
  
<style lang="scss">
$bar-width: 80%;
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
        flex: 1;
    }

    .active {
        background: lightblue;
    }
}
.bar{
    max-height: 20%;
    width: $bar-width;
    position: relative;
    background: white;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 20px;
    left: calc(50% - #{$bar-width} / 2);
}
</style>