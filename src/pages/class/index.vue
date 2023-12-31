<template>
    <!-- 发起签到（还没点开始签到） -->
    <view>
        <view class="top">
            <img src="/static/logo.png" alt="" class="pictrue">
            
            <view class="cardList">
                <view class="fontStyle">课程名：{{ classInfo.name }}</view>
                <view class="fontStyle">班级：{{ classInfo.classRange }}</view>
                <view class="fontStyle">上课时间：{{ classInfo.day }}</view>
                <view class="fontStyle">人数：{{ classInfo.total }}</view>
                <view class="fontStyle">{{ classInfo.range }}</view>
            </view>
            
        </view>
        <view class="bar">
            <uni-easyinput prefixIcon="search" v-model="searchContent" 
            placeholder="按照姓名/学号搜索学生" 
            @iconClick="iconClick" @input="filterContent">
            </uni-easyinput>
        </view>
        <view class="stuList" v-for="(item, index) in tempList" :key="index">
            <uni-card :title="item.name" :sub-title="joinString(joinString('班级:', item.gov_class,),joinString('——学号:', item.id,))" :extra="item.numbers"
                 @tap="onClick">
                <button @tap="kickCLass(item.id)" class="fuckout" >踢出班级</button>
            </uni-card>
        </view>
    </view>
</template>
<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import Class from '@/services/class/index'
const searchContent = ref("");

const classInfo = ref({
	name: "操作系统",
	classRange: "五到六班",
	range: "1-18周",
	day: "周五",
    total:30
});
const studList = ref([
    {
        name: '周建辉',
        id: '20210020216516',
        gov_class: '计算机五班1',
    },
    {
        name: '林',
        id: '20210020216512',
        gov_class: '计算机五班1',
    }
]);

const joinString = (str1, str2) => {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
        return str1 + str2;
    }
}
const tempList = ref([])
//搜索
const filterContent = (val) =>{
    if(val === ""){
        tempList.value = studList.value
        return;
    }
    const filter = (arr,ori,val) =>{
        arr.value = ori.value.filter((item)=>{
            let content= item.name.toString();
            return content.includes(val.toString());
        })
    }
    filter(tempList,studList,val);
}
const getList = async (id) => {
	const res =  await Class.getClassList(id)
    
	studList.value = res.data;
	tempList.value = res.data;
};
const getClassInfo = async(id)=>{
    const res = await Class.getClassInfo(id);
    classInfo.value = res.data
}
const kickCLass = async(id) =>{
    Class.kickCLass(id)
}
onLoad((options) => {
    setInterval(()=>{
        console.log('test')
    },1000)
    tempList.value = studList.value
    getClassInfo(options.id);
    getList(options.id);
});
</script>

<style lang="scss">
$bar-width: 80%;
.top{
    margin-bottom: 20px;
	position: relative;
	width: 100%;
	height: 15vh;
	background: white;
	display: flex;
	justify-content: space-between;
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
        padding-left: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
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
.fuckout{
    background-color: rgb(214, 223, 247);
    &:active{
        background-color: rgb(191, 209, 243);
    }
}
.fontStyle {
	padding: 4px;
	font-weight: bolder;
	font-size: small;
}
</style>

<!-- <template>
        <div class="container">

            <img class="image" src="/static/logo.png" alt="">
            <div class="classInfo">
                <div class="fontStyle">
                    课程名:{{ classInfo.name }}
                </div>
                <div class="fontStyle">
                    班级: {{ classInfo.classRange }}
                </div>
                <div class="fontStyle" >
                    <span style="margin-right:10px">
                        上课时间: {{ classInfo.day }}
                    </span>
                    
                    <span style="margin-right:10px">
                        {{ classInfo.range }}
                    </span>
                    <span >
                       人数:{{ classInfo.total }}人
                    </span>
                </div>
            </div>
        </div>
	<view class="classList" v-for="(item, index) in classList" :key="index">
        <div class="header" style="font-size: 20px; font-weight:bold; padding:5px">
            {{item.name}}
        </div>
        <div class="line">
                <span style="font-size: small; padding:10px"> 学号:{{item.id}}</span>
                <span style="font-size: small; padding:10px">班级:{{item.gov_class}}</span>
                <button style="right:10px;position:absolute" @tap="kickCLass(item.id)" size="mini" type="primary" >踢出班级</button>
        </div>

    </view>
</template>
<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import Class from '@/services/class/index'
const classInfo = ref({
	name: "操作系统",
	classRange: "五到六班",
	range: "1-18周",
	day: "周五",
    total:30
});
const classList = ref([
	{
		name: "猫三",
		id: "202100202149",
		gov_class: "计算机一半",
	},
]);
//请求
const getClassList = async(id) =>{
   const res =  await Class.getClassList(id)
   classList.value = res.data
}
const kickCLass = async(id) =>{
    Class.kickCLass(id)
}
const getClassInfo = async(id)=>{
    const res = await Class.getClassInfo(id);
    classInfo.value = res.data
}
onLoad((options) => {
    getClassInfo(options.id);
    getClassList(options.id);
});
</script>
<style>
.rightEnd{
    display: flex;
    justify-content: flex-end;
}
.line{
    display: flex;
    align-items: baseline;
    justify-content:flex-start
}

    .fontStyle{
        padding: 4px;
        font-weight: bolder;
        font-size: small;
    }
    .classList{
        padding: 10px;
    background: white;
    }
    .container{
        margin-bottom: 20px;
        position: relative;
        width: 100%;
        height: 15vh;
        background: white;
        display: flex;
        justify-content: space-between;
    }
    .image{
        display: block;
        position:relative;
        height: 100%;
        width: 15vh;
    }
    .classInfo{
        padding-left: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    
</style> -->