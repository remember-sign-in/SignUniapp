import { defineStore } from "pinia";

export  const useLoginStore = defineStore('LoginStore',{
    state: () =>({
        token:'123456789',
        userid:-1,
        avaUrl:'',
        nickName:'',
        number:"202100202151",
        class:"计算机一班"
    }),
    getters: {
        // getUserInfo:() =>this.userid
    },
    actions: {
        getUserInfo(){
            return this.userid;
        },
        test(){
            console.log('test');
        },
        setId(id){
            this.userid = id;
        },
        setToken(token){
            this.token = token;
            uni.setStorageSync('SignInToken',token);
        },
        removeToken(){
            this.token='';
            uni.removeStorageSync('SignInToken');
        },
        getToken(){
            this.token = uni.getStorageSync('SignInToken');
            if(!this.token){
                console.log('token不存在');
            }
            return this.token;
        },
        getAll(){
           let temp = {
                userid:this.userid,
                avaUrl:this.avaUrl,
                nickName:this.nickName,
                number:this.number,
                class:this.class
            }
            return temp;
        },
        setInfo(obj){
            
            this.setToken(obj.token);
            this.setId(obj.id);
            this.avaUrl = obj.avatarUrl;
            this.nickName = obj.nickName;
            
        },
        logout(){
            uni.navigateTo({
                url:'/pages/login/index'
            })
            this.removeToken('SignInToken');
        }
        
    }

})
export default useLoginStore;
   