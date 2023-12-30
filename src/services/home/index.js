import req from "../methods/index";
const http = new req();
//获取首页列表
//http://116.62.191.77:80
export default {
	getJoinList(id = -1) {
		return http.get(`http://116.62.191.77:80/home/joinList/${id}`);
	},
	getCreateList(id = -1) {
		return http.get(`http://116.62.191.77:80/home/createList/${id}`);
	},
	searchList(params) {
		return http.get(`http://116.62.191.77:80/home/searchList`,params);
	}
};
