import { useLoginStore } from "./store"
const loginStore = useLoginStore();

const config = {
    invoke(args){
        
        if(!loginStore.getToken()){
        
            return;
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
    if(!token) {
        uni.navigateTo({
            url:"/pages/login/index"
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