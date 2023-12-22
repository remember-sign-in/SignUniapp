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
