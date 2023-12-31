<template>
  <div class="container">
    <view class="countDown">
      <span style="font-size: 20px; margin-right: 20px">倒计时: </span>
      <uni-countdown
        :font-size="20"
        :show-day="false"
        :start="true"
        @timeup="timeup"
        :hour="0"
        :minute="time.minute"
        :second="0"
      />
    </view>
    <view>签到码:{{}}</view>
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
  <view class="option">
    <view v-for="(item, index) in options">
      <button
        @tap="changeIndex(index)"
        :class="index === activeBtIndex ? 'active' : ''"
      >
        {{ item.name }}
      </button>
    </view>
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
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";
import Record from "@/services/class/index";
import Sign from "@/services/record/index";
import User from "@/services/user/index";
const searchContent = ref("");
const flag = ref(true);
let signId = ref(-1);
const options = [{ name: "已签到" }, { name: "未签到" },{name:'缺勤'},{name:'请假'}];
const activeBtIndex = ref(0);
const time = ref({
  hour: 0,
  minute: 0,
  second: 0,
});
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
    time: "2023-12-15 15:65:34",
    id: "34",
  },
  {
    name: " 周树人",
    number: "202100202149",
    gov_class: "计算机一班",
    status: "已签到",
    time: "2023-12-15 15:65:34",
    id: "34",
  },
]);
const tempList = ref([]);
let timer;
const timeup = () => {
  uni.showToast({
    title: "时间到",
  });
  clearInterval(timer);
};

const updataSign = async (id) => {
  const { data } = await Sign.getRecordDetail(id);
  console.log(data);
  recordList.value = data.items;
};
const start = async (classid, time) => {
  let { data } = await User.startSign({
    class_id: classid,
    time: time,
  });
  flag.value = false;
  signId.value = data.message[0]["签到id"];
  // return;
  console.log(signId.value);
  updataSign(signId.value);
  if(!timer){
      timer = setInterval(()=>{
          updataSign(signId.value);
        },1000)
    }
};

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
const getRecor2dList = async (id) => {
  const res = await Record.getRecordList(id);
  recordList.value = res.data;
  tempList.value = res.data;
};
//
onLoad((option) => {
  console.log(option, "params Form home.vue");
  time.value.minute = parseInt(option.duration);
  tempList.value = recordList.value;
  start(option.classid, parseInt(option.duration) * 60);
});
onShow((option) => {});
</script>
<style lang="scss">
$bar-width: 80%;
.option{
    display: flex;
    width: 100vw;
    &>view{
        border-radius: 0;
        flex:1;

    }
    &>button{
        border-radius: 0;
        background: transparent;
    }
}
.active {
    background: lightblue;
  }
.countDown {
  font-weight: bolder;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
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
  font-weight: bold;
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
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
}
.image {
  display: block;
  position: relative;
  height: 100%;
  width: 15vh;
}
.info {
  padding-left: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
</style>
