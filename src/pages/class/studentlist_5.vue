<template>
    <!-- 发起签到（还没点开始签到） -->
    <view>
        <view class="top">
            <img src="/static/logo.png" alt="" class="pictrue">
            
            <view class="cardList">
                <view>课程名：{{ classInfo.name }}</view>
                <view>班级：{{ classInfo.classRange }}</view>
                <view>上课时间：{{ classInfo.day }}</view>
                <view>人数：{{ classInfo.total }}</view>
                <view>{{ classInfo.range }}</view>
            </view>
            
        </view>
        <view>
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
    tempList.value = studList.value
    getClassInfo(options.id);
    getList(options.id);
});
</script>

<style lang="scss">

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
    .cardList{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: small;
        margin-left: 10px;
    }
}
.fuckout{
    background-color: rgb(214, 223, 247);
    &:active{
        background-color: rgb(191, 209, 243);
    }
}
</style>