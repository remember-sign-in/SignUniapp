<template>
	<div class="container">
		<img class="image" src="/static/logo.png" alt="" />
		<div class="info">
			<div class="fontStyle">总人数: {{ indexInfo.total }}人</div>
			<div class="fontStyle">已签到: {{ indexInfo.signed }}人</div>
			<div class="fontStyle">未签到: {{ indexInfo.lack }}人</div>
		</div>
	</div>
	<view class="bar">
		<uni-easyinput
			prefixIcon="search"
			v-model="searchContent"
			placeholder="啦啦啦"
			@iconClick="iconClick"
			@input="filterContent"
		>
		</uni-easyinput>
	</view>
	<view class="list" v-for="(item, index) in tempList" :key="index">
		<div
			class="header"
			style="font-size: 20px; font-weight: bold; padding: 5px"
		>
			{{ item.name }}
		</div>
		<div class="line">
			<span style="font-size: small; padding: 10px">
				学号:{{ item.number }}</span
			>
			<span style="font-size: small; padding: 10px"
				>班级:{{ item.gov_class }}</span
			>
			<button
				style="right: 10px; position: absolute"
				@tap="signUp(item.id)"
				size="mini"
				type="primary"
			>
				{{ item.status }}
			</button>
		</div>
	</view>
</template>
<script setup>
import { onLoad,onShow } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";
import Record from "@/services/record/index";
import  useLoginStore  from "@/store";
const loginStore  = useLoginStore()
const searchContent = ref("");
let userid =ref(-1)
const indexInfo = ref({
	total: 30,
	signed: 20,
	lack: 10,
});
const recordList = ref([
	{
		name: " 范嘉诚",
		number: "202100202149",
		gov_class: "计算机一班",
		status: "已签到",
		id: "34",
	},
	{
		name: " 周树人",
		number: "202100202149",
		gov_class: "计算机一班",
		status: "已签到",
		id: "34",
	},
]);
const tempList = ref([]);
//搜索
const filterContent = (val) => {
	if (val === "") {
		tempList.value = recordList.value;
		return;
	}
	const filter = (arr, ori, val) => {
		arr.value = ori.value.filter((item) => {
			let content = item.name.toString();
			return content.includes(val.toString());
		});
	};
	filter(tempList, recordList, val);
};
//请求
const getList = async(id) =>{
    let res = await Record.getRecordList(id);
    recordList.value = res.data;
    tempList.value = recordList.value;
	if(res.data.id === '') uni.showToast({
		title:res.data.info
	})
}
//
onLoad((options) => {
	userid.value = loginStore.getUserid();
    
});
onShow((options)=>{

})
</script>
<style lang="scss">
$bar-width: 80%;

.bar {
	max-height: 20%;
	width: $bar-width;
	position: relative;
	background: white;
	margin-top: 15px;
	margin-bottom: 15px;
	border-radius: 20px;
	left: calc(50% - #{$bar-width} / 2);
}
.rightEnd {
	display: flex;
	justify-content: flex-end;
}
.line {
	display: flex;
	align-items: baseline;
	justify-content: flex-start;
}

.fontStyle {
	padding: 4px;
	font-weight: bolder;
	font-size: small;
}
.list {
	border: 6px solid #e3dede;
	padding: 10px;
	margin: 2px;
	background: white;
}
.container {
	margin-bottom: 20px;
	position: relative;
	width: 100%;
	height: 15vh;
	background: white;
	display: flex;
	justify-content: space-between;
}
.image {
	display: block;
	position: relative;
	height: 100%;
	width: 15vh;
}
.info {
	padding-left: 20px;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
}
</style>
