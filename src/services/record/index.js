import req from "../methods/index";
const http = new req();

export default{
    getRecordList(id){
        return http.get(`/record/list/${id}`);
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