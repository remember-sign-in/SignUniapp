//请求
import { useLoginStore } from "@/store";
const loginStore = useLoginStore();
const baseUrl  = 'http://127.0.0.1:4523/m1/3686108-0-default';
//请求拦截
const httpInterceptor  = {
    //拦截前触发
    invoke(options){
        //1.非http拼接url
       if(!options.url.includes('http')){
        //代理掉 
        options.url = options.url.replace('/api','');
        options.url = baseUrl + options.url;
       }
       //2.超时处理
       options.timeout = 5000;
       //3.token
       const token = loginStore.$state.token;
       //4.header
       options.header = {
        ...options.header,
       }
       if(!token){
        //重新登录,页面跳转
        //提示登录过期
        console.log('没有token')

       }
       else if(token) {
        options.header.token= token;
       }
       
       else {
        throw new Error('token异常')
       }
       
    }
}

//请求函数
export const api = (options) =>{
    return new Promise((resolve,reject) =>{
        uni.request({
            ...options,
            //有响应
            success(res){   // 200 300 401 
                if(res.statusCode >=200 && res.statusCode <300){
                    resolve({data:res.data,statusCode:res.statusCode});
                }
                //未授权
                else if(res.statusCode === 401) {
                    //跳转登录页面
                    reject(res)
                }
                else {
                    uni.showToast({
                        icon:'none',
                        title:res.data.message || '请求错误'
                    });
                    reject(res);
                }
            },
            fail(err){
                uni.showToast({
                    icon:'none',
                    title:'网络错误'
                })
                reject(err);
            }
        })
    })
}
uni.addInterceptor('request',httpInterceptor);
uni.addInterceptor('uploadFile',httpInterceptor);




