import req from "../methods/index";
const http = new req();

export default{
    getRecordList(params){
        return http.post("record/list",params);
    },
    getRecordDetail(params){
        return http.post("record/detail",params);
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