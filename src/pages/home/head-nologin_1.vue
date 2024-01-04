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
        <view class="top">
            <img src="/static/logo.png" alt="" class="pictrue">
        </view>
        <button class="login" @tap="onclick">
                登录/注册
        </button>
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
const onclick = () =>{
    uni.navigateTo({
        url: '/pages/login/index'
    })
}
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
        flex: 1;
    }

    .active {
        background: lightblue;
    }
}
.top{
        margin-top: 50px;
        width: 100%;
        // 行排列
        align-items: center;
        flex-direction: column;
        display: flex;
        // 上下居中
        .pictrue{
        height: 80px;
        width: 80px;
        border-radius: 50%;
        }
    }
    .login{
        // 居中
        margin-top: 30px;
        height: 40px;
        width: 100px;
        font-size: medium;
    }    
</style>