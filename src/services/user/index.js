import req from "../methods/index";
const http = new req();


export default{
    subSignup(params){
        return http.post("/user/subSign",params);
    },

    startSign(params){
        return http.post(`https://j.ojbk.me/user/startSign?class_id=${params.class_id}&time=${params.time}`,params)
    },
    stopSign(params){
        return http.post(`https://j.ojbk.me/user/stopSign?checkIn_id=${params.checkIn_id}`,params)
    },
    signUp(params){
        return http.post(`https://j.ojbk.me/user/signUp?id=${params.id}&class_id=${params.class_id}&signIn_number=${params.code}`,params)
    },
    editInfo(params){
        return http.post(`/user/editInfo?name=${params.name}&id=${params.id}`,params)
    },
    userInfo(id){
        return http.get(`/user/info/${id}`)
    },

}