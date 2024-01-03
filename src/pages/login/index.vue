<template>
  <div class="container">
    <!-- <div class="row">
                <input
                class="gap"
                style="padding:10px; background: white; height: 30px; border-radius: 30px;"
                v-model="loginForm.accout"
                placeholder="输入账号"
                placeholder-class="input-placeholder"
                />
            </div>
            <div class="row">
                <input
                class="gap"
                style="padding:10px; background: white; height: 30px; border-radius: 30px;"
                v-model="loginForm.pwd"
                placeholder="输入密码"
                placeholder-class="input-placeholder" type="password"
                />
            </div>
            <div class="row">
                <button style="margin: 15px" size="default" type="primary" @tap="register">
                    注册
                </button>
                <button @tap="login" style="margin: 15px" size="default" type="primary" >
                    登录
                </button>
            </div> -->

    <uni-popup ref="popup" background-color="#fff" @change="change">
      <view style="position: relative">
        <div class="row2" style="color:black"> 获取你的个人信息</div>
        <uni-card
          is-shadow="false"
          :title="Info.nickName"
          :isFull="true"
          sub-title="微信个人信息"
          :thumbnail="Info.avatarUrl"
        >
          <div class="row1">
            <button class="bt" type="default">拒绝</button>
            <button class="bt" type="primary" @tap="jump">允许</button>
          </div>
        </uni-card>
      </view>

      <view v-show="false" class="con">
        <view class="list" style="top: 10vh">
          <view class="row">
            <view>昵称</view>
            <switch @change="changeNick" checked />
          </view>
          <view class="row">
            <view>头像</view>
            <switch @change="changeAva" />
          </view>
          <view class="row">
            <button @tap="jump" style="width: 50%" type="primary" class="text">
              授权登录
            </button>
          </view>
        </view>
      </view>
    </uni-popup>
     <!-- ---------------------------------我添加的bebin--------------------------------- -->
    <uni-popup ref="namePopup" background-color="#fff" @change="change">
    <view class="popup-container">
      <div class="popup-title">请输入你的姓名</div>
      <input v-model="name" placeholder="输入姓名" class="popup-input" />
      <button @tap="submitName" class="popup-button" size="default" type="primary">
        确定
      </button>
    </view>
    </uni-popup>
    <!-- ---------------------------------我添加的end--------------------------------- -->

  </div>
</template>

<script setup>
import { onLoad ,onShow} from "@dcloudio/uni-app";
import { ref ,onMounted} from "vue";
import useLoginStore from "@/store/Login/index";
import Login from "@/services/login/index";
import guard from "@/permission";
import edit from "@/services/user/index";
const loginStore = useLoginStore();
const popup = ref(null);
let status = false
let Info = ref({
  avatarUrl: "/static/logo.png",


  nickName: "匿名用户",
});

let authChoice = ref({
  nickName: true,
  avatarUrl: true,
});
const getInfo = () => {
  wx.getUserInfo({
    des: "ddd",
    success: (res) => {
      console.log(res);
    },
  });
};
const changeNick = (e) => {
  let val = e.target.value;
  authChoice.value.nickName = val;
};
const changeAva = (e) => {
  let val = e.target.value;
  authChoice.value.avatarUrl = val;
};
let obj ={}
const auth = () => {
  wx.login({
    success: async (res) => {
      console.log(res.code,'code');
      let { data } = await Login.login(res.code);
      //设置用户id
      wx.getUserInfo({
        provider: "weixin",
        withCredentials: true,
        success: async ({ userInfo }) => {
          obj = {
            ...data,
            ...userInfo,
          };
          Info.value = obj;
          console.log(Info.value);
          let userid = loginStore.getUserid();
          status = true;
        // ---------------------------------我添加的bebin---------------------------------
        // 检查用户是否已经存在
          const userExists = await checkUserExists(userid);  
          // 如果用户不存在，打开新的弹出窗口
          // if (status&& !userExists ) {
          if (status) {
            namePopup.value.open();
          }
        // ---------------------------------我添加的bebin---------------------------------
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
    fail: (err) => {
      console.log(err);
    },
  });
};
const jump = () => {
  if(!status) return;
  console.log(obj);
    loginStore.setInfo(obj);
    setTimeout(()=>{
      uni.navigateBack({
        delta: 1,
        success(res) {
          console.log(res);
        },
        fail(err) {
          uni.switchTab({
            url: "/pages/home/index",
          });
        },
      },100)
  });
};
onMounted(() => {
  console.log('login Page')
  // guard()
  auth();
  popup.value.open("bottom");
});
onShow(()=>{
  status = false;
    auth()
  
}) 
// ---------------------------------我添加的bebin---------------------------------

// 查看用户是否存在
const checkUserExists =(userid)=>{
  return true
}
let name = ref(""); // 用于存储用户输入的姓名
const namePopup = ref(null); // 引用新的弹出窗口
const submitName = async () => {
  // 当用户点击确定按钮时，发送 POST 请求
  const response = await edit.editUser(userid, name.value)
  console.log(response);
  if (response) {
    // 如果请求成功，关闭弹出窗口
    namePopup.value.close();
  } else {
    // 如果请求失败，处理错误
    console.error("Failed to submit name");
  }
};
// ---------------------------------我添加的end---------------------------------
</script>
<style lang="scss">
.bt {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 30px;
  font-size: 14px;
}
.row2{
    font-size: 16px;
    margin-left: 2vw;
    margin-top: 3vh;
    margin-bottom: 3vh;
    height: 100%;
    display: flex;
}
.row1 {
    position:relative;
    width: 60%;
  margin-top: 1vh;
  margin-bottom: 3vh;
  height: 100%;
  display: flex;
  left:17%;
  justify-content: space-evenly;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100px;
  width: 100vw;
  .row {
    padding: 15px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}

.popup-container {
  position: relative;
  padding: 20px;
}

.popup-title {
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.popup-input {
  width: 80%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.popup-button {
  width: 50%;
  height: 40px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  background-color: #007BFF;
  color: #fff;
  border-radius: 5px;
  border: none;
}
</style>
