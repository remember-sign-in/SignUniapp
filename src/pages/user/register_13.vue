<template>
    <!-- 发起签到（还没点开始签到） -->
    <view class="register">
        
        <view class="registerdata">
            <view class="uni-form-item uni-column">
                <view class="title">姓名/昵称：
                    <input class="uni-input" v-model="username" focus placeholder="请输入姓名/工号" />
                </view>
                
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">学号/工号：
                    <input class="uni-input" v-model="username" focus placeholder="请输入学号/工号" />
                </view>
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">我的班级：
                    <input class="uni-input" v-model="username" focus placeholder="请输入班级" />
                </view>
            </view>
            <view class="uni-form-item uni-column">
                <view class="title">手机号：
                    <input class="uni-input" v-model="username" focus placeholder="请输入手机号" />
                </view>
                <view class="getword">
                <button>
                    <text>获取验证码</text>
                </button>
            </view>
            </view>
            
            <view class="uni-form-item uni-column">
                <view class="title">验证码：
                    <input class="uni-input" v-model="username" focus placeholder="请输入验证码" />
                    
                </view>
                
            </view>
        </view>
        <view class="changebutton">
            <button>
                <text>注册</text>
            </button>
        </view>
        
         
    </view>
</template>
<script setup>


const datalist ={
    stuName: '周建辉',
    className: '计算机五班1',
    stunumber:'201721040124',
}
</script>

<style lang="scss">
.register{
    display: flex;
    flex-direction: column;
    float: left;
    margin-left: 10px;
}

.registerdata{
    width: 100%;
    display: flex;
    background-color: rgb(255, 255, 255);
    align-items: center;
    flex-direction: column;
    float: left;
    .uni-form-item uni-column{
        
        flex-direction: row;  
    }
    .title{
        
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        align-items: center;
        .uni-input{
            border: 1px solid #ccc;
            border-radius: 10px;
            height: 40px;
            width: 200px;
            
        }
    }
   
}
.changebutton{
    margin-top: 10px;
    button{
        height: 40px;
        width: 40%;
        background-color: rgb(191, 209, 243);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.getword{
    margin-top: 10px;
    button{
        height: 40px;
        width: 40%;
        background-color: rgb(191, 209, 243);
        display: flex;
        font-size: small;
        justify-content: center;
        align-items: center;
        
    }
}
</style>