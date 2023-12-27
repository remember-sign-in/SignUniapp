<template>
    <view>
        <view class="options">
            <view v-for="(item, index) in options">
                <button @tap="changeIndex(index)" :class="index === activeBtIndex ? 'active' : ''">
                    {{ item.name }}
                </button>
            </view>
        </view>
        <view v-if="activeBtIndex==0" class="mid">
            <view class="smallimg"></view>
            <input type="text" v-model="inviteCode" placeholder="邀请码" class="inputtext">
            <button @click="joinClass">加入班级</button>
        </view>
        <view v-else class="mid">
            <view class="smallimg"></view>
            <input type="text" placeholder="课程名称" class="inputtext">
            <input type="text" placeholder="班级名称" class="inputtext">
            <button>生成邀请码</button>
        </view>
    </view>
</template>
   

<script setup>
import { ref, reactive } from 'vue';
const options = [
    { name: '加入班级' },
    { name: '创建班级' },
]
//ref reactive
const activeBtIndex = ref(0)
const searchContent = ref('');

const changeIndex = (index) => {
    activeBtIndex.value = index;
}
const addcode = ref({
    inviteCode: '',
    id: '1'
})
const joinClass =async(form = addcode.value)=>{
        var data = form.inviteCode;
        var url = "http://116.62.191.77:80/class/joinClass"; 
        uni.request({
        url: url, 
        method: "POST", 
        data: data, 
        header: {
            "content-type": "application/json" 
        },
        success: function (res) {
            console.log(res.data); 
        },
        fail: function (err) {
            console.log(err);
        }
        });
    }

</script>

  
<style lang="scss">
.options {
    display: flex;
    flex-direction: row;

    view {
        flex: 1;
    }

    .active {
        background: rgb(191, 209, 243);
    }
}
.mid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .smallimg {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-image: url('/static/logo.png');
        background-size: cover;
    }
    .inputtext {
        width: 60%;
        height: 40px;
        border-radius: 20px;
        border: 1px solid rgb(191, 209, 243);
        margin-top: 20px;
        text-align: center;
    }
    button{
        width: 50%;
        border-radius: 20px;
        border: 1px solid rgb(191, 209, 243);
        margin-top: 20px;
        text-align: center;
        align-items: center;
        // 文字对齐
        background-color: rgb(203, 217, 243);
        &:active{
            background-color: rgb(191, 209, 243);
        }
    }
}
</style>