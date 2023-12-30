import  useLoginStore  from "@/store/Login/index"
const loginStore = useLoginStore();
const config = {
    invoke(args){
        let all =  loginStore.getAll();
        console.log(all,'->>>>>')
      
        // const checkInfo = (obj) =>{
        //     for(let key in obj){
        //         console.log(key,obj[key])
        //         if(obj[key]==='' || obj[key]===null)
        //         return false;
        //     }
        // }
        // checkInfo(all)
        console.log(uni.getStorage('userid'))
        if(!uni.getStorage('userid')){
            uni.removeInterceptor('navigateTo')
            uni.removeInterceptor('switchTab')
            uni.navigateTo({
                url: '/pages/login/index'
            })
            uni.showToast({
                title: '请先登录',
                icon: 'none'
            })
        }
    }
}
 const gurad = () =>{
    const token = loginStore.getToken()
    uni.addInterceptor('navigateTo',config);
    uni.addInterceptor('switchTab',config);
    uni.switchTab({
        url: '/pages/home/index'
    })
    // if(!token) {
    //     uni.navigateTo({
    //         url:"/pages/login/index"
    //     })
    // }
    // else { 
    //     uni.switchTab({
    //         url: '/pages/home/index'
    //     })
    // }
}

export default gurad;