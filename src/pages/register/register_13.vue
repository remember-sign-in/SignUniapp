<template>
    <view class="register">
      <image class="logo" src="/static/logo.png"></image>
      <form class="register-form">
        <view class="input-item">
            <input type="text" v-model="username" placeholder="姓名/昵称" class="theinput">
        </view>
            <view class="input-item">
            <input type="text" v-model="usernum" placeholder="学号/工号" class="theinput">
            </view>
            <view class="input-item">
            <input type="password" v-model="password" placeholder="输入密码" class="theinput">
            </view>
            <view class="input-item">
            <input type="password" v-model="confirmPassword" placeholder="确认密码" class="theinput">
            </view>
            
            <button type="button" class="register-btn" @click="register">注册</button>
      </form>
    </view>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        usernum: '',
        password: '',
        confirmPassword: '',
        username: ''
      };
    },
    methods: {
      async register() {
        if(!this.username || !this.password || !this.usernum) {
          uni.showToast({
            title: '请填写完整信息',
            icon: 'none'
          });
          return;
        }
  
        if(this.password !== this.confirmPassword) {
          uni.showToast({
            title: '两次输入密码不一致',
            icon: 'none'
          });
          return;
        }
  
        try {
          const response = await axios.post(' ', {
            username: this.username,
            password: this.password,
            usernum: this.usernum
          });
  
          const responseData = response.data;
          if(responseData.code === " ") {
            uni.showToast({
              title: responseData.message,
              icon: 'success'
            });
            uni.navigateTo({
              url: '/pages/login/index'
            });
          } else {
            uni.showToast({
              title: responseData.message,
              icon: 'none'
            });
          }
        } catch (error) {
          let errorMessage = '注册失败，请稍后再试';
          if(error.response) {
            if(error.response.status === " ") {
              errorMessage = error.response.data.message;
            }
          }
  
          uni.showToast({
            title: errorMessage,
            icon: 'none'
          });
        }
      },
      goBack() {
        uni.navigateBack();
      }
    }
  };
  </script>
  
  
  
  
  <style scoped>
  .register {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100rpx;
  }
  
  .logo {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
  
  .register-form {
    width: 90%;
    padding: 40rpx;
    background-color: #fff;
    border-radius: 5rpx;
  }

  .theinput{
    font-size:medium;
  }
  .input-item {
    margin: 10rpx 0;
    border-bottom: 1rpx solid #ddd;
  }
  
  input {
    width: 100%;
    height: 50rpx;
    padding: 10rpx;
    font-size: 16rpx;
    outline: none;
    border: none;
  }
  
  .register-btn {
    display: block;
    margin: 30rpx auto 0;
    width: 90%;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background-color: #007aff;
    color: #fff;
    border-radius: 5rpx;
    font-size: 20rpx;
  }
  
  .back-btn {
    margin-top: 20rpx;
    color: #007aff;
    width: 60%;
    height: 80rpx;
  }
  </style>
  
  