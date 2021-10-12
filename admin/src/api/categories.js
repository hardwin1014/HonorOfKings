import request from "../utils/request";

// 创建分类
export function addCategories(data, url) {
  return request({
    url: `/rest/${url}`,
    method: "POST",
    data,
  });
}

// 修改分类
export function editCategories(id, data, url) {
  return request({
    url: `/rest/${url}/${id}`,
    method: "PUT",
    data,
  });
}

// 查看分类列表
export function categoriesList(url) {
  return request({
    url: `/rest/${url}`,
    method: "GET",
  });
}

// 查看分类详情
export function categoryDetail(id, url) {
  return request({
    url: `/rest/${url}/${id}`,
    method: "GET",
  });
}

// 删除分类
export function delCategory(id, url) {
  return request({
    url: `/rest/${url}/${id}`,
    method: "DELETE",
  });
}

// 上传
// http://127.0.0.1:3000/admin/api/upload
export function uploadPic(data) {
  return request({
    url: "/upload",
    method: "POST",
    data,
  });
}
