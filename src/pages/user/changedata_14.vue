<template>
    <!-- 发起签到（还没点开始签到） -->
    <view class="changedata">
        <view class="top">
            
            
            <view class="stuList">
                <view>姓名：{{ datalist.stuName }}</view>
                <view>班级：{{ datalist.className }}</view>
                <view>学号：{{ datalist.stunumber }}</view>
                
            </view>
            
        </view>
        <view class="change">
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
        </view>
        <view class="changebutton">
            <button>
                <text>确认修改</text>
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
.changedata{
    display: flex;
    flex-direction: column;
}
.top{
    height:80px;
    width: 100%;
    background-color:  rgb(191, 209, 243);
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
    .stuList{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: small;
        margin-left: 10px;
    }
    .example-body {
    
    width: 80px;
    background-size: cover;
    background-color: aliceblue;
    
	}
}
.change{
    width: 100%;
    display: flex;
    background-color: rgb(255, 255, 255);
    align-items: center;
    flex-direction: column;
    float: left;
    .uni-form-item uni-column{
        display: flex;
        flex-direction: row;  
    }
    .title{
        display: flex;
        flex-direction: row;
        margin-top: 30px;
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
    margin-top: 50px;
    button{
        height: 40px;
        width: 40%;
        background-color: rgb(191, 209, 243);
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    
}

</style>