import req from "../methods/index";
const http = new req();
//获取首页列表
//https://j.ojbk.me
export default {
	getJoinList(id = -1) {
		return http.get(`https://j.ojbk.me/home/joinList/${id}`);
	},
	getCreateList(id = -1) {
		return http.get(`https://j.ojbk.me/home/createList/${id}`);
	},
	searchList(params) {
		return http.get(`https://j.ojbk.me/home/searchList`,params);
	}
};
