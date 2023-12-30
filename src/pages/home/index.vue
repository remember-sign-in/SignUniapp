<template>
  <view>
    <view>
      <uni-easyinput
        prefixIcon="search"
        @input="search"
        v-model="searchContent"
        placeholder="啦啦啦"
        @iconClick="iconClick"
      >
      </uni-easyinput>
    </view>
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
    <view v-if="tempList!=='null'" class="cardList" v-for="(item, index) in tempList" :key="index">
      <uni-card
        :title="item.name"
        :sub-title="'邀请码:' + item.joinCode"
        :extra="item.numbers + '人'"
        thumbnail="/static/logo.png"
      >
        <view class="sub-Container"
          ><span style="width: 10%"></span>
          <view class="subFun">
            <button
              v-show="options[activeBtIndex].name === '我创建的'"
              @tap="startSign(id,item.id)"
            >
              发起签到
            </button>
            <button @tap="toRecord(item.id)">签到记录</button>
            <button
              v-show="options[activeBtIndex].name === '我创建的'"
              @tap="toClass(item.id)"
            >
              班级管理
            </button>
            <button
              v-show="options[activeBtIndex].name === '我加入的'"
              @tap="toClass(item.id)"
            >
              进行签到
            </button>
          </view>
        </view>
      </uni-card>
    </view>
    <view v-else class="center">
        暂无班级
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import home from "@/services/home/index";
import guard from "@/permission.js";
import useLoginStore from "@/store/Login/index";
const loginStore = useLoginStore();
//const let
const options = [{ name: "我加入的" }, { name: "我创建的" }];

//ref reactive
const id = ref(-1);//用户id
const activeBtIndex = ref(0);
const searchContent = ref("");
const tempList = ref([]);
const cardList = ref([
  {
    index: 1,
    name: "操作系统",
    numbers: "41人",
    joinCode: "123",
    id: "12",
  },
  {
    index: 2,
    name: "计网",
    numbers: "40人",
    joinCode: "123",
    id: "12",
  },
]);

//请求处理 ------------------------
//我创建的
const getCreateList = async () => {
  const res = await home.getCreateList(id.value);
  cardList.value = res.data.items;
  tempList.value = res.data.items;
  if (!tempList.value) tempList.value = [];
};
//我加入的
const getJoinList = async () => {
  const res = await home.getJoinList(id.value);
  cardList.value = res.data.items;
  tempList.value = res.data.items;
};

//逻辑函数 ------------------------
//
const changeIndex = (index) => {
  activeBtIndex.value = index;
  if (index === 0) {
    getJoinList();
  } else {
    getCreateList();
  }
};
//搜索
const search = (val) => {
  if (val === "") {
    tempList.value = cardList.value;
    return;
  }
  const filter = (arr, ori, val) => {
    arr.value = ori.value.filter((item) => {
      let content = item.name.toString();
      return content.includes(val);
    });
  };
  filter(tempList, cardList, val);
};
//凭借字符串
const joinString = (str1, str2) => {
  if (typeof str1 === "string" && typeof str2 === "string") {
    return str1 + str2;
  }
};
//发起签到
const startSign = (userid,classid) => {
  console.log(userid,classid)

};
//跳转班级管理
const toClass = (id) => {
  uni.navigateTo({
    url: `/pages/class/index?id=${id}`,
  });
};
//跳转班级签到记录
const toRecord = (id) => {
  uni.navigateTo({
    url: `/pages/record/classRecord?id=${id}`,
  });
};
//Onload
onLoad(async (options) => {
  id.value = loginStore.getUserid();
  if(options[activeBtIndex.value]==='我加入的') getJoinList();
  else getCreateList();
  guard();
});
onShow(async (options) => {
  id.value = loginStore.getUserid();
  if(options[activeBtIndex.value]==='我加入的') getJoinList();
  else getCreateList();
});
</script>

<style lang="scss">
.center{
    display: flex;
    height: 80vh;
    justify-content: center;
    align-items: center;

}
.sub-Container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subFun {
  display: flex;

  & > button {
    margin-left: 10px;
    font-weight: 500;
    font-size: 80%;
  }
}

.options {
  display: flex;
  flex-direction: row;

  view {
    flex: 1;
  }

  .active {
    background: lightblue;
  }
  & > button {
    background: transparent;
  }
}
</style>
