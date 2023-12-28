import req from "../methods/index";
const http = new req();
export default{
    userLogin(params){
        return http.post("/user/login",params)
    },
    login(code){
        return http.get(`http://116.62.191.77:80/api/JDQD/getOpenid?code=${code}`)
    },
 
}    