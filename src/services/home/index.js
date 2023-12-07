import req from '../methods/index';
const http = new req();
//获取首页列表
export const getHomeList = async (id=0) => {
    return new Promise((resolve,reject)=>{
        http.get(`/api/test/${id}`).then(res =>{
            resolve(res)
        })
        .catch(e=>{
            reject(e)
        })
    })
}