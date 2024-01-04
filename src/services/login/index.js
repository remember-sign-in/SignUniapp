import req from "../methods/index";
const http = new req();
export default{
    userLogin(params){
        return http.post("/user/login",params)
    },
    login(code){
        return http.get(`https://j.ojbk.me/api/JDQD/getOpenid?code=${code}`)
    },
 
}    