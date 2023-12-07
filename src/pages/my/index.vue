<template>
	<view>

		<div @click="send">my5555555555</div>
		<div>

			<button style="width: 100px;" @click="login">login</button>
		</div>
	</view>
</template>
<script setup>
import { api } from '@/utils';
import req from '@/Http/methods'
import {testGet,testPost} from '@/Http';
const send  = async() =>{
	const res = await testGet();
	console.log(res);

}
const login = async() =>{
	uni.login({ 
	"provider": "weixin",
	"onlyAuthorize": true, // 微信登录仅请求授权认证
	success: function(event){
		const {code} = event
		//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
		uni.request({
		    url: 'https://www.example.com/loginByWeixin', //仅为示例，并非真实接口地址。
		    data: {
		        code: event.code
		    },
		    success: (res) => {
		        //获得token完成登录
				uni.setStorageSync('token',res.token)
		    }
		});
	},
	fail: function (err) {
        // 登录授权失败  
        // err.code是错误码
    }
})

}
</script>
