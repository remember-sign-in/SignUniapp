<template>
  <div class="container">
    <view class="countDown">
      <span style="font-size: 20px; margin-right: 20px">倒计时: </span>
      <uni-countdown
        :font-size="20"
        :show-day="false"
        :start="isStart"
        @timeup="timeup"
        :hour="0"
        :show-colon="false"
        :minute="time.minute"
        :second="0"
      />
    </view>
    <div class="info">
      <div class="fontStyle">总人数: {{ indexInfo.total }}人</div>
      <div class="fontStyle">已签到: {{ indexInfo.signed }}人</div>
      <div class="fontStyle">未签到: {{ indexInfo.unsigned }}人</div>
    </div>
    <view class="fontStyle" style="position:relative;left:20%">签到码:{{ signCode }}</view>
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
  <view v-show="false" class="option">
    <view v-for="(item, index) in options" class="Bt">
      <button
        @tap="changeIndex(index)"
        :class="index === activeBtIndex ? 'active' : ''"
      >
        {{ item.name }}
      </button>
    </view>
  </view>

  <view class="list" v-for="(item, index) in tempList" :key="index">
    <view>
      <uni-card  sub-title="454545">
        <template v-slot:title>
          <view style="font-size: 20px; font-weight: bold; padding: 5px">{{ item.name }}</view>
        </template>
        <view style="font-weight: 600;">
          班级：{{ item.class }}
        </view>
				<view  class="uni-body">
          <span  style="font-weight: 600;">
            签到时间：{{ item.time }}
          </span>
          <span :class="item.status === 1 ? 'signed':'unsigned'"  style="font-weight: 600; cursor:pointer" >
            {{ item.status === 1 ? "已签到" : "未签到"}}
          </span>
        </view>
			</uni-card>
    </view>
    <!-- <div
      class="header"
      style="font-size: 20px; font-weight: bold; padding: 5px"
    >
      {{ item.name }}
    </div>
    <div class="line">
        <span 
          >班级:{{ item.class }}</span
        >
      <span >
        签到时间:{{ item.time }}</span
      >
      <button
        style="right: 10px; position: absolute"
        @tap="signUp(item.id)"
        size="mini"
        type="primary"
      >
        {{ item.status }}
      </button>
    </div> -->
  </view>
</template>
<script setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import Record from "@/services/class/index";
import Sign from "@/services/record/index";
import User from "@/services/user/index";
const searchContent = ref("");
const flag = ref(true);
let signId = ref(-1);
let currentIndex = ref(0);
const colorOpt = [
  'lightgreen',
  'darkred'
]
const options = [
  { name: "已签到" },
  { name: "未签到" },
  { name: "缺勤" },
  { name: "请假" },
];
const activeBtIndex = ref(0);
const checkin_id = ref(-1);
let isStart = ref(true);
const open = () => {
  isStart.value = !isStart.value;
};
const close = () => {
  clearInterval(timer);
  isStart.value = !isStart.value;
};
let signCode = ref(-1);
const time = ref({
  hour: 0,
  minute: 1,
  second: 0,
});
const indexInfo = ref({
  total: '0',
  signed: '0',
  unsigned: '0',
});
const recordList = ref([

]);
const tempList = ref([]);
let timer;
const timeup = () => {
  User.stopSign({checkIn_id: signId.value})
  uni.showToast({
    title: "时间到",
    icon:'none'
  });
  clearInterval(timer);
};

const changeIndex = (index) => {
  currentIndex.value = index;
//   if (recordList.value) {
//     tempList.value = recordList.value.filter(
//       (item) => item.status === options[index].name
//     );
//   }
};
const updataSign = async (id) => {
  const { data } = await Sign.getRecordDetail(id);
  console.log(data, "签到list");
//   if (!data) {
//     uni.showToast({
//       title: '暂无签到记录',
//       icon: "none",
//     });
//     tempList.value = [];
//     return;
//   }
  recordList.value = data;
  tempList.value = data;
  indexInfo.value.total = data[0].total;
  indexInfo.value.signed = data[0].signed;
  indexInfo.value.unsigned = data[0].unsigned;
  changeIndex(currentIndex.value);
};
const startSign = async (classid, time) => {
  let { data } = await User.startSign({
    class_id: classid,
    time: time,
  });
  console.log(data, "开始签到");
  checkin_id.value = data.info.checkin_id;
  signCode.value = data.info.signup_code;
  return data;
};
const start = async (classid, time) => {
  startSign(classid, time);
  if (!timer) {
    timer = setInterval(() => {
      updataSign(checkin_id.value);
    }, 1000);
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
  // if(timer) clearInterval(timer)
  console.log("isStart",isStart.value)
  isStart.value = false;
  time.value.minute = parseInt(option.duration);
  let tempTime = time.value.minute * 60;
  let tempId = option.classid;
  tempList.value = recordList.value;
  open(tempId,tempTime)
  start(tempId, tempTime);
  //   start(option.classid, parseInt(option.duration) * 60);
});
onShow((option) => {
  // if(timer) clearInterval(timer)
  if (option) {
    let tempTime = time.value.minute * 60;
    let tempId = option.classid;
    start(tempId, tempTime);
  }
});
</script>
<style lang="scss">
$bar-width: 80%;
.signed{
  color: lightgreen;
}
.unsigned{
  color:rgb(179, 0, 0);
}
.uni-body{
  display: flex;
  justify-content: space-between;
}
.option {
  display: flex;
  width: 100vw;
  & > view {
    border-radius: 0;
    flex: 1;
  }
  & > button {
    border-radius: 0;
    background: transparent;
  }
}
.active {
  background: lightblue;
}
.countDown {
  position:relative;
  left: 20%;
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
  &>span{
    font-size:small;
    padding:0px;
  }
}

.fontStyle {
  padding: 4px;
  font-weight: bold;
  font-size: small;
}
.list {
  border: 6px solid #e3dede;
  background: white;
}
.container {
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  height: 15vh;
  background: white;
  display: flex;
  align-items: flex-start;
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
  position: relative;
 left:20%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
</style>
