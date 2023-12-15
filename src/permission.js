import { useLoginStore } from "./store"
const loginStore = useLoginStore();

const config = {
    invoke(args){
        if(!loginStore.getToken()){
            uni.showToast({
                title: '请先登录',
                icon: 'none'
            })
            uni.navigateTo({
                url: '/pages/login/index'
            })
        }
    }
}
 const gurad = () =>{
    const token = loginStore.getToken()
    console.log(token,'->>>>')
    if(!token) {
        uni.switchTab({
            url: '/pages/login/index'
        })
    }
    else { 
        uni.switchTab({
            url: '/pages/home/index'
        })
    }
    uni.addInterceptor('navigateTo',config);
    uni.addInterceptor('switchTab',config);
}

export default gurad;