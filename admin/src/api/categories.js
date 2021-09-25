import request from "../utils/request";

// 创建name
export function categories(data) {
	return request({
		url: '/categories',
		method: 'POST',
		data
	})
}
