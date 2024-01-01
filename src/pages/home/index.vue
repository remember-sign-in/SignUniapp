<template>
  <view>
    <view class="option">
      <view v-for="(item, index) in option">
        <button
          @tap="changeIndex(index)"
          :class="index === activeBtIndex ? 'active' : ''"
        >
          {{ item.name }}
        </button>
      </view>
    </view>
    <view class="search">
      <uni-easyinput
        prefixIcon="search"
        @input="search"
        v-model="searchContent"
        placeholder="啦啦啦"
        @iconClick="iconClick"
      >
      </uni-easyinput>
    </view>
    <view
      v-if="tempList !== 'null'"
      class="cardList"
      v-for="(item, index) in tempList"
      :key="index"
    >
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
              v-show="option[activeBtIndex].name === '我创建的'"
              @tap="startSign(id, item.index)"
            >
              发起签到
            </button>
            <button @tap="toRecord(item.id)">签到记录</button>
            <button
              v-show="option[activeBtIndex].name === '我创建的'"
              @tap="toClass(item.index)"
            >
              班级管理
            </button>
            <button
              v-show="option[activeBtIndex].name === '我加入的'"
              @tap="Confirm(item.index)"
            >
              进行签到
            </button>
            <button
              v-show="option[activeBtIndex].name === '我加入的'"
              @tap="exitClass(item.index)"
            >
              退出班级
            </button>
          </view>
        </view>
      </uni-card>
    </view>
    <!-- 全局定位 -->
    <view v-else class="center"> 暂无班级 </view>
    <!-- 签到设置弹框 -->
    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog
        style="position: relative; top: 20%"
        ref="inputClose"
        mode="input"
        title="签到持续时间(分钟)"
        v-model="duration"
        placeholder="签到时间"
        @confirm="signConfirm"
      >
        <uni-number-box v-model="duration" @change="changeDuration" />
      </uni-popup-dialog>
    </uni-popup>
    <!-- 签到输入弹窗 -->
    <uni-popup ref="signDialog" type="dialog">
      <uni-popup-dialog
        style="position: relative; top: 30%"
        ref="inputClose"
        mode="input"
        title="签到码"
        @confirm="signUp"
      >
      <input placeholder="签到码" v-model="code">
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import home from "@/services/home/index";
import guard from "@/permission.js";
import User from "@/services/user/index";
import Class from "@/services/class/index";
import useLoginStore from "@/store/Login/index";
const loginStore = useLoginStore();
//const let
const option = [{ name: "我加入的" }, { name: "我创建的" }];

//ref reactive
const currentClass = ref(-1);
const duration = ref(2);
const inputDialog = ref(null);
const signDialog = ref(null);
const id = ref(-1); //用户id
const activeBtIndex = ref(0);
const searchContent = ref("");
const tempList = ref([]);
let classid = ref(-1)
let code = ref('')
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
const exitClass = async(classid,userid = id.value) =>{
  await Class.exitClass(classid,userid)
  getJoinList()
}
//我创建的
const getCreateList = async () => {
  const res = await home.getCreateList(id.value);
  cardList.value = res.data.MyClass;
  tempList.value = res.data.MyClass;
  if (!tempList.value) tempList.value = [];
};
//我加入的
const getJoinList = async () => {
  const res = await home.getJoinList(id.value);
  cardList.value = res.data.JoinClass;
  tempList.value = res.data.JoinClass;
};

//逻辑函数 ------------------------
const Confirm = (class_id) =>{
  classid.value = class_id
  signDialog.value.open();
}
//进行签到 
const signUp = async() =>{
  console.log(code.value,'dffd')
  let {data} = await User.signUp({
    id:id.value,
    class_id:classid.value,
    code:code.value
  })
  uni.showToast({
    title:data.info.result,
    icon:'none'
  })
}
const changeDuration = (val) => {
  duration.value = val;
};
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
const startSign = (userid, classid) => {
  inputDialog.value.open();
  currentClass.value = classid;
};
const signConfirm = () => {
  uni.navigateTo({
    url: `/pages/sign/index?duration=${duration.value}&classid=${currentClass.value}`,
  });
};
//跳转班级管理
const toClass = (id) => {
  console.log(id);
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
  if (
    !option[activeBtIndex.value] ||
    option[activeBtIndex.value].name === "我加入的"
  )
    getJoinList();
  else getCreateList();
});
onShow(async (options) => {
  id.value = loginStore.getUserid();
  console.log();
  if (
    !option[activeBtIndex.value] ||
    option[activeBtIndex.value].name === "我加入的"
  )
    getJoinList();
  else getCreateList();
});
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  left: 10%;
  margin-top: 4vh;
  width: 80%;
}
.dialog-box {
  padding: 10px;
}
.dialog-text {
  font-size: 14px;
  color: #333;
}
.center {
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

.option {
  display: flex;
  flex-direction: row;

  & > view {
    flex: 1;
    & > button {
      border-radius: 0;
      background: transparent;
    }
  }

  .active {
    background: lightblue;
  }
}
</style>
