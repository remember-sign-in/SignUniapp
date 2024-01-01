import req from "../methods/index";
const http = new req();

export default {
	kickClass(userid,classid) {
		return http.put(`http://116.62.191.77:80/class/kickClass/${userid}?class_id=${classid}`);
	},
	getClassList(id) {
		return http.get(`http://116.62.191.77:80/class/classList/${id}`);
	},
    getClassInfo(id){
        return http.get(`http://116.62.191.77:80/class/classInfo/${id}`);
    },
    joinClass(params){
        return http.post(`http://116.62.191.77:80/class/joinClass/?id=${params.id}&joinCode=${params.joinCode}`,params)
    },
    exitClass(classid,userid){
        return http.put(`http://116.62.191.77:80/class/exitClass/${userid}?class_id=${classid}`)
    },
    createClass(params){
        
        return http.post(`http://116.62.191.77:80/class/create_class/?id=${params.id}&class_name=${params.class_name}&numbers=${params.numbers}`,params) 
    }

};
