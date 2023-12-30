import  useLoginStore  from "@/store/Login/index"
const loginStore = useLoginStore();
const config = {
    invoke(args){
        let all = loginStore.getAll();
        console.log(all,'->>>>>')
      
        // const checkInfo = (obj) =>{
        //     for(let key in obj){
        //         console.log(key,obj[key])
        //         if(obj[key]==='' || obj[key]===null)
        //         return false;
        //     }
        // }
        // checkInfo(all)
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