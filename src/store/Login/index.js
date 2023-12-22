import { defineStore } from "pinia";

export  const useLoginStore = defineStore('LoginStore',{
    state: () =>({
        token:'123456789',
        user_id:""
    }),
    getters: {

    },
    actions: {
        test(){
            console.log('test');
        },
        setId(id){
            this.id = id;
        },
        setToken(token){
            this.token = token;
            uni.setStorageSync('SignInToken',token);
        },
        getToken(){
            this.token = uni.getStorageSync('SignInToken');
            if(!this.token){
                throw new Error('token不存在');
            }
            return this.token;
        }
    }

})
export default useLoginStore;
   