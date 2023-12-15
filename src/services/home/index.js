import req from "../methods/index";
const http = new req();
//获取首页列表

export default {
	getJoinList(id = 0) {
		return http.get(`/api/home/joinList/${id}`);
	},
	getCreateList(id = 0) {
		return http.get(`/api/home/createList/${id}`);
	},
	searchList(params) {
		return http.get(`/api/home/searchList`,params);
	}
};
