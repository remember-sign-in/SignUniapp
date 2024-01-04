<template>
    <!-- 发起签到（还没点开始签到） -->
    <view>
        <view class="top">
            <img src="/static/logo.png" alt="" class="pictrue">
            
            <view class="cardList">
                <view class="fontStyle">班级：{{ classInfo.class_num }}</view>
                <view class="fontStyle">人数：{{ classInfo.total }}</view>
            </view>
            
        </view>
        <view class="bar">
            <uni-easyinput prefixIcon="search" v-model="searchContent" 
            placeholder="按照姓名/学号搜索学生" 
            @iconClick="iconClick" @input="filterContent">
            </uni-easyinput>
        </view>
        <view class="stuList" v-for="(item, index) in tempList" :key="index">
            <uni-card :title="joinString('姓名: ',item.name)" :sub-title="joinString('班级:', item.gov_class)" :extra="item.numbers"
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
const classId = ref(-1)
const classInfo = ref({
	class_id: "38",
	class_num: "计算机5班",
	creator_id: "1",
    total:"2"
});
const studList = ref([
    {
        name: '周建辉',
        id: '1',
        gov_class: '计算机五班1',
    },
    {
        name: '林',
        id: '2',
        gov_class: '计算机五班1',
    }
]);

const joinString = (str1, str2) => {
    
        return str1 + str2;
    
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
	const {data} =  await Class.getClassList(id)
    console.log(data,'班级list')
	studList.value = data.class;
	tempList.value = data.class;
};
const getClassInfo = async(id)=>{
    const res = await Class.getClassInfo(id);
    classInfo.value = res.data
}
const kickCLass = async(userid,classid=classId.value) =>{
    const {data} = await Class.kickClass(userid,classid);
    getList(classId.value);
    getClassInfo(classId.value)
}
onLoad((options) => {
    tempList.value = studList.value;
    console.log(options.id)
    classId.value = options.id;
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

