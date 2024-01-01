import { api } from "@/utils";
class req {
	constructor() {
		this.index = 1;
	}
	get(url, options = {}) {
		return api({
			...options,
			method: "GET",
			url: url,
		});
	}
	post(url, data) {
		return api({
			method: "POST",
			url,
			data,
		});
	}
	put(url, data) {
		return api({
			method: "PUT",
			url,
			data,
		});
	}
}

export default req;
