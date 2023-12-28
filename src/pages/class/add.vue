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
            <input type="text" v-model="addcode.joinCode" placeholder="邀请码" class="inputtext">
            <button @click="joinClass">加入班级</button>
        </view>
        <view v-else class="mid">
            <view class="smallimg"></view>
            <input type="text" placeholder="班级最大人数" class="inputtext" v-model="createdata.numbers">
            <input type="text" placeholder="班级名称" class="inputtext" v-model="createdata.class_name">
            <button @click="creatclass">生成邀请码</button>
        </view>
    </view>
</template>
   

<script setup>
const id = ref(1);
import { ref, reactive } from 'vue';
import Record from "@/services/class/index";
import home from '@/services/home/index'
import useLoginStore from "@/store/Login/index";
const loginStore = useLoginStore();
let userid = loginStore.getUserInfo();
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
    id: userid,
    joinCode: '12344'
    
})

const createdata = ref({
    id: userid,
    class_name: '计算机',
    numbers: 50
})
const joinClass =async(form = addcode.value)=>{
    // console.log(addcode.value);
    // const res = await Record.addClass(addcode.value);
    // console.log(res.value);
    const res = await home.getCreateList(id.value)
    
         console.log(res.data.items)
    }
const creatclass = async (form = createdata.value) => {
    console.log(createdata.value);
    const res = await Record.create_class(createdata.value);
    console.log(res.value);
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