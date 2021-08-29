import request from "@/utils/request";

export function headerImg(data) {
  return request({
    url: "/header-img/detail",
    method: "get",
    params: data,
  });
}

export function headerListUpdate(data) {
  return request({
    url: "/header-img/update",
    method: "post",
    data,
  });
}
