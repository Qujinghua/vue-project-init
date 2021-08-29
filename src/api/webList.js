import request from "@/utils/request";

export function webList(data) {
  return request({
    url: "/web-list/list",
    method: "get",
    params: data,
  });
}

export function webListAdd(data) {
  return request({
    url: "/web-list/add",
    method: "post",
    data,
  });
}
