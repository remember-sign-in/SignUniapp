import { defineStore } from "pinia";

export  const useLoginStore = defineStore('LoginStore',{
    state: () =>({
        token:'123456789',
        userid:-1,
        avaUrl:'',
        nickName:''
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
        getToken(){
            this.token = uni.getStorageSync('SignInToken');
            if(!this.token){
                console.log('token不存在');
            }
            return this.token;
        },
        setInfo(obj){
            
            this.setToken(obj.token);
            this.setId(obj.id);
            this.avaUrl = obj.avatarUrl;
            this.nickName = obj.nickName;
            
        },
        
    }

})
export default useLoginStore;
   