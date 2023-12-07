import { defineStore } from "pinia";

export  const useLoginStore = defineStore('LoginStore',{
    state: () =>({
        token:'123456789'
    }),
    getters: {

    },
    actions: {
        setToken(token){
            this.token = token;
            uni.setStorageSync('SignInToken',token);
        },
        getToken(){
            this.token = uni.getStorageSync('SignInToken');
            if(!this.token){
                throw new Error('token不存在');
            }
            return token;
        }
    }

})
   