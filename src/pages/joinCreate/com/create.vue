<template>
	<div class="container">
		<div class="row">
			<span class="gap">课程名称:</span>
			<input
				class="gap"
				style="text-align: center; background: white"
				v-model="newForm.name"
				placeholder="点击生成邀请码"
				placeholder-class="input-placeholder"
			/>
		</div>
		<div class="row">
			<span class="gap">班级范围</span>
			<input
				class="gap"
				style="text-align: center; background: white"
				v-model="newForm.classRange"
				placeholder=""
				placeholder-class="input-placeholder"
			/>
		</div>
        <div class="row">
			<span class="gap">人数</span>
			<input
				class="gap"
				style="text-align: center; background: white"
				v-model="newForm.total"
				placeholder=""
				placeholder-class="input-placeholder"
			/>
		</div>
        <div class="row">
			<span class="gap">上课时间</span>
			<input
				class="gap"
				style="text-align: center; background: white"
				v-model="newForm.time"
				placeholder=""
				placeholder-class="input-placeholder"
			/>
		</div>
		<button style="margin: 20px" size="default" type="primary">
			创建班级
		</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';
const newForm = ref({
    joinCode: '',
    classRange:'',
    range:'',
    day:'',
    total:0,
})
</script>
<style lang="scss">
.gap {
	margin: 15px;
}
.row {
	display: flex;
    justify-content: space-between;
    width: 80%;
}
.center {
	position: absolute;
	top: 50%;
}
.container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
