import request from "@/utils/request";

export function getNewsList(data) {
  return request({
    url: "/news-center/list",
    method: "get",
    params: data,
  });
}

export function newsAdd(data) {
  return request({
    url: "/news-center/editor-img",
    method: "post",
    data,
  });
}

export function newsUpdate(data) {
  return request({
    url: "/news-center/update",
    method: "post",
    data,
  });
}
