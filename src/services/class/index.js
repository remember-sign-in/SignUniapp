import req from "../methods/index";
const http = new req();

export default {
	kickClass(id) {
		return http.get(`/api/class/kickClass/${id}`);
	},
	getClassList(id) {
		return http.get(`/api/class/classList/${id}`);
	},
    getClassInfo(id){
        return http.get(`/api/class/classInfo/${id}`);
    },
    joinClass(params){
        return http.post(`http://116.62.191.77:80/class/joinClass/?id=${params.id}&joinCode=${params.joinCode}`,params)
    },
    addClass(params){
        return http.post('/api/class/addClass',params)
    },
    exitClass(id){
        return http.post(`/api/class/exitClass/${id}`)
    },
    createClass(params){
        
        return http.post(`http://116.62.191.77:80/class/create_class/?id=${params.id}&class_name=${params.class_name}&numbers=${params.numbers}`,params) 
    }

};
