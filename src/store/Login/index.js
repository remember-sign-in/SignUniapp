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
            uni.setStorageSync('userid',id);
        },
        setToken(token){
            this.token = token;
            uni.setStorageSync('SignInToken',token);
        },
        setAvaUrl(url){
            this.avaUrl = url;
            uni.setStorageSync('avaUrl',url);
        },
        setNickname(name){
            this.nickName = name;
            uni.setStorageSync('nickName',name);
        },
        setClass(clas){
            this.class = clas;
            uni.setStorageSync('class',clas);
        },
        removeStorage(name){
            this[name]='';
            uni.removeStorageSync(name);
        },
        getUserid(){
            this.userid = uni.getStorageSync('userid');
            if(this.userid===-1){
                console.log('token不存在');
            }
            return this.userid;
        },
        getToken(){
            this.token =  uni.getStorageSync('SignInToken');
            if(!this.token){
                console.log('token不存在');
            }
            return this.token;
        },
         getAll(){
            this.userid = uni.getStorageSync('userid');
            this.token = uni.getStorageSync('SignInToken');
            this.avaUrl = uni.getStorageSync('avaUrl');
            this.nickName = uni.getStorageSync('nickName');
            this.class =  uni.getStorageSync('class');
           let temp = {
                userid:this.userid,
                avaUrl:this.avaUrl,
                nickName:this.nickName,
                number:this.number,
                class:this.class
            }
            console.log(temp,'allInfo');
            return temp;
        },
        setInfo(obj){
            this.setToken(obj.token);
            this.setId(obj.id);
            this.setAvaUrl(obj.avatarUrl);
            this.setNickname(obj.nickName);
            // this.avaUrl = obj.avatarUrl;
            // this.nickName = obj.nickName;
            
        },
         logout(){
            this.removeStorage('SignInToken');
            this.removeStorage('userid');
            this.removeStorage('avaUrl');
            this.removeStorage('nickName');
            this.removeStorage('class');
            this.removeStorage('number');
            setTimeout(()=>{

                uni.navigateTo({
                    url:'/pages/login/index'
                })
            },100)
        }
        
    }

})
export default useLoginStore;
   