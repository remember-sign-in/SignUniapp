import req from "../methods/index";
const http = new req();


export default{
    subSignup(params){
        return http.post("/user/subSign",params);
    },

    startSign(params){
        return http.post(`http://116.62.191.77:80/user/startSign?class_id=${params.class_id}&time=${params.time}`,params)
    },
    stopSign(params){
        return http.post(`http://116.62.191.77:80/user/stopSign?checkIn_id=${params.checkIn_id}`,params)
    },
    signUp(params){
        return http.post(`http://116.62.191.77:80/user/signUp?id=${params.id}&class_id=${params.class_id}&signIn_number=${params.code}`,params)
    },
    editInfo(params){
        return http.post("/user/editInfo",params)
    },
    userInfo(id){
        return http.get(`/user/info/${id}`)
    },
}