import req from "../methods/index";
const http = new req();


export default{
    subSignup(params){
        return http.post("/user/subSign",params);
    },
   
    startSign(params){
        return http.post("/user/startSign",params)
    },
    stopSign(params){
        return http.post("/user/stopSign",params)
    },
    signUp(params){
        return http.post("/user/signUp",params)
    },
    editInfo(params){
        return http.post("/user/editInfo",params)
    },
    userInfo(id){
        return http.get(`/user/info/${id}`)
    },
}