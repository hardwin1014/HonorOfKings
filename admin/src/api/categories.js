import request from "../utils/request";

// 创建分类
export function addCategories(data) {
  return request({
    url: "/rest/categories",
    method: "POST",
    data,
  });
}

// 修改分类
export function editCategories(id, data) {
  return request({
    url: `/rest/categories/${id}`,
    method: "PUT",
    data,
  });
}

// 查看分类列表
export function categoriesList() {
  return request({
    url: "/rest/categories",
    method: "GET",
  });
}

// 查看分类详情
export function categoryDetail(id) {
  return request({
    url: `/rest/categories/${id}`,
    method: "GET",
  });
}

// 删除分类
export function delCategory(id) {
  return request({
    url: `/rest/categories/${id}`,
    method: "DELETE",
  });
}
