import request from "@/utils/request";

export function mainImg(data) {
  return request({
    url: "/main-img/detail",
    method: "get",
    params: data,
  });
}

export function mainImgUpdate(data) {
  return request({
    url: "/main-img/update",
    method: "post",
    data,
  });
}
