import request from "@/utils/request";

export function getTitleKeyDesc(data) {
  return request({
    url: "/title-key-desc/detail",
    method: "get",
    params: data
  });
}

export function titleKeyDescUpdate(data) {
  return request({
    url: "/title-key-desc/update",
    method: "post",
    data
  });
}
