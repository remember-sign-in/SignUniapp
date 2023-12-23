<template>
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
    
</style>