import req from "../methods/index";
const http = new req();
export default{
    userLogin(params){
        return http.post("/user/login",params)
    }
}