<template>
    <div class="container">
        <input
            style="text-align: center; background:white"
            v-model="joinCode"
            placeholder="请输入邀请码"
            placeholder-class="input-placeholder"
        />
        <button style="margin: 20px;" size="default" type="primary">加入</button>
    </div>
</template>

<script setup>
import {ref} from 'vue'
</script>

<style>
.center{
    position:absolute;
    top: 50%;
}
.container{
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>