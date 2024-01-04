<template>
  <view style="height: 100vh;overflow:hidden">
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
    <view v-if="activeBtIndex == 0" class="mid">
      <view class="smallimg"></view>
      <input
        type="text"
        v-model="addcode.joinCode"
        placeholder="邀请码"
        class="inputtext"
      />
      <button @click="joinClass" class="join">加入班级</button>
    </view>
    <view v-else class="mid">
      <view class="smallimg"></view>
      <input
        type="text"
        placeholder="班级名称"
        class="inputtext"
        v-model="createdata.class_name"
      />
      <input
        type="text"
        placeholder="班级最大人数"
        class="inputtext"
        v-model="createdata.numbers"
      />
      <input
        type="text"
        placeholder="邀请码（自动生成）"
        class="inputtext"
        v-model="createdata.code"
      />
      <button class="createclass" @click="creatclass">创建班级</button>
    </view>
  </view>
</template>

<script setup>
const id = ref(1);
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, computed } from "vue";
import Record from "@/services/class/index";
import home from "@/services/home/index";
import useLoginStore from "@/store/Login/index";
const loginStore = useLoginStore();
const options = [{ name: "加入班级" }, { name: "创建班级" }];
const classInfo = ref({});
//ref reactive
const activeBtIndex = ref(0);
const searchContent = ref("");
let userid = ref(-1);
const changeIndex = (index) => {
  activeBtIndex.value = index;
};
const addcode = ref({
  id: -1,
  joinCode: "",
});

const createdata = ref({
  id: -1,
  class_name: "",
  numbers: 50,
  code: "",
});
const joinClass = async (form = addcode.value) => {
  const { data } = await Record.joinClass(addcode.value);
  uni.showToast({
    title: data.info,
    icon: "none",
  });
  if (data.info !== "加入班级失败") {
    setTimeout(()=>{

      uni.switchTab({
        url: `/pages/home/index`,
      });
    },1000)
    
  }
};
const creatclass = async (form = createdata.value) => {
  const { data } = await Record.createClass(createdata.value);
  console.log(data,'00000000')
  createdata.value.code = data.info.joinCode;
  uni.showToast({
    title: data.info["result"],
    icon: "none",
  });
};

onLoad(() => {
  userid.value = loginStore.getUserid();
  addcode.value.id = parseInt(userid.value);
  createdata.value.id = parseInt(userid.value);
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
    background: rgb(191, 209, 243);
  }
}
.createclass{
    width: 50%;
   
}
.join{
    width: 50%;
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
    background-image: url("/static/logo.png");
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
  button {
    width: 50%;
    border-radius: 20px;
    border: 1px solid rgb(191, 209, 243);
    margin-top: 20px;
    text-align: center;
    align-items: center;
    // 文字对齐
    background-color: rgb(203, 217, 243);
    &:active {
      background-color: rgb(191, 209, 243);
    }
  }
}
</style>
