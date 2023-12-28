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
        return http.post('/api/class/joinClass',params)
    },
    addClass(params){
        return http.post('/api/class/addClass',params)
    },
    exitClass(id){
        return http.post(`/api/class/exitClass/${id}`)
    },
    create_class(params){
        return http.post('/api/class/create_class',params)
        // return http.post('http://116.62.191.77:80/class/create_class',params)
    }

};
