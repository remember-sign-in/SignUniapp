import req from "./methods"
const http = new req();
export const testGet = async() =>{
    return  http.get('/api/test/3');
}
export const testPost = async() =>{
    return  http.post('/api/test2/',{
        code:'111111',
        name:'3333'
    });
}