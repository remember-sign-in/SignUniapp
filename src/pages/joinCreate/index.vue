<template>
	<view class="options">
		<view v-for="(item, index) in options">
			<button
				@tap="changeIndex(index)"
				:class="index === activeBtIndex ? 'active' : ''"
			>
				{{ item.name }}
			</button>
		</view>
		<button @tap="login">测试登录</button>
		<button @tap="webSocketTest">测试websocket</button>

	</view>
    <join v-show="activeBtIndex===0" ></join>
    <create v-show="activeBtIndex===1"></create>
</template>
<script setup>
import join from "./com/join.vue";
import create from "./com/create.vue";
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const activeBtIndex = ref(0);
const options = [{ name: "加入" }, { name: "创建" }];

const changeIndex = (index) => {
	activeBtIndex.value = index;
};
const login = () =>{
    wx.login({
            success:(res)=>{
                console.log("code: " + res.code);
            }
        })
}
const webSocketTest = () =>{
	let socket = new WebSocket("ws://localhost:8080/websocket");
	socket.onmessage = function(event) {
		console.log("收到消息: " + event.data);
	}
}
onLoad((options) => {

});
</script>

<style lang="scss">
.options {
	display: flex;
	flex-direction: row;

	view {
		flex: 1;
	}

	.active {
		background: lightblue;
	}
}
</style>
