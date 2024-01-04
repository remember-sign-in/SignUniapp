import req from "../methods/index";
const http = new req();
//https://j.ojbk.me
export default{
    getRecordList(id){
        return http.get(`https://j.ojbk.me/record/list/${id}`);
    },
    getRecordDetail(id){
        return http.get(`https://j.ojbk.me/record/detail?checkin_id=${id}`);
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