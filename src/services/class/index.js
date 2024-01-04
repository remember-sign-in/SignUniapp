import req from "../methods/index";
const http = new req();

export default {
	kickClass(userid,classid) {
		return http.put(`https://j.ojbk.me/class/kickClass/${userid}?class_id=${classid}`);
	},
	getClassList(id) {
		return http.get(`https://j.ojbk.me/class/classList/${id}`);
	},
    getClassInfo(id){
        return http.get(`https://j.ojbk.me/class/classInfo/${id}`);
    },
    joinClass(params){
        return http.post(`https://j.ojbk.me/class/joinClass/?id=${params.id}&joinCode=${params.joinCode}`,params)
    },
    exitClass(classid,userid){
        return http.put(`https://j.ojbk.me/class/exitClass/${userid}?class_id=${classid}`)
    },
    createClass(params){
        
        return http.post(`https://j.ojbk.me/class/create_class/?id=${params.id}&class_name=${params.class_name}&numbers=${params.numbers}`,params) 
    }

};
