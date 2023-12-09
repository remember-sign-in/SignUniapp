<template>
    <!-- 发起签到（还没点开始签到） -->
    <view>
        <view class="top">
            <view class="example-body">
				<uni-file-picker limit="1" ></uni-file-picker>
			</view>
            
            <view class="cardList">
                <view>课程名：{{ classlist.courseName }}</view>
                <view>班级：{{ classlist.className }}</view>
                <view>上课时间：{{ classlist.classtime }}</view>
                <view>人数：{{ classlist.count }}</view>
            </view>
            
        </view>

        <view class="signway">
            
            <view class="text1">签到方式:</view>
            <view class="choices">
                <radio-group bindchange="bandleChange" class="choices">
                <radio color="red" value="way1" class="choice"> 签到码</radio>
                <radio color="red" value="way2" class="choice"> 二维码</radio>
                <radio color="red" value="way3" class="choice"> 定位签到</radio>
                </radio-group>
            </view> 
        </view>
            
        <view >
            <button class="start">开始签到</button>
        </view>
    </view>
</template>
<script setup>

const Page=({

data: {
  choice: "签到码"
},
bandleChange(e){
  let choice = e.detail.value;
  // 2 把值赋值给 data 中的数据
  this.setData({
    // gender:gender
    choice
  })
}
})

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
    .example-body {
    
    width: 80px;
    background-size: cover;
    background-color: aliceblue;
    
	}
}

.signway{
        height:80px;
        width: 100%;
        display: flex;
        background-color: rgb(240, 240, 240);
        align-items: center;
        flex-direction: row;
        .text1{
            margin-left: 10px;
            font-size: small;
            width: 75px;
           
        }
        .choice{
            
            font-size: medium;
            width: 75px;
            
        }
        .choices{
            transform: scale(0.8)
            
        }
        
    }
.start{
    
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    width: 80%;
    background-color: rgb(214, 223, 247);
    &:active{
        background-color: rgb(160, 176, 222);
    }
}
</style>