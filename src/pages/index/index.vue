<template>
  <view>
    <view >
      <uni-easyinput  prefixIcon="search" v-model="searchContent" placeholder="左侧图标" @iconClick="iconClick">
			</uni-easyinput>
    </view>
    <view class="cardList"
    v-for="(item,index) in cardList"
    :key="index" 
    >
      <uni-card :title="item.className" :sub-title="joinString('课程名:',item.courseName)" :extra="item.numbers" thumbnail="/static/logo.png" @click="onClick">
          <view class="sub-Container">邀请码:{{item.code}}
            <view class="subFun" >
              <button @click="change">发起签到</button>
              <button>班级管理</button>
            </view>
          </view>
      </uni-card>
    </view>
  </view>
  </template>

<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';

//ref reactive
const searchContent = ref('');
const cardList = reactive([
  {
    courseName: '软件工程1',
    className: '计算机五班1',
    numbers: '41人',
    code:'123'
  },
  {
    courseName: '软件工程2',
    className: '计算机五班2',
    numbers: '40人',
    code:'123'
  }
])
//Function
const joinString = (str1,str2) =>{
  if(typeof str1 === 'string' && typeof str2 === 'string'){
    return str1 + str2;
  }
}
</script>


<style lang="scss">
  .sub-Container{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .subFun{
    display: flex;
    button{
      font-size: 80%;
    }
  }
</style>