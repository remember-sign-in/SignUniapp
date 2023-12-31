import req from "../methods/index";
const http = new req();
//http://116.62.191.77:80
export default{
    getRecordList(id){
        return http.get(`/record/list/${id}`);
    },
    getRecordDetail(id){
        return http.get(`http://116.62.191.77:80/record/detail?checkin_id=${id}`);
    },
    delRecord(params){
        return http.post("record/del",params);
    },
    getOneRecord(params){
        return http.post("record/oneRecord",params);
    },
    getUnSignList(params){
        return http.post("record/unsignList",params);
    },
    getSingList(params){
        return http.post("record/signList",params);
    }
    
}