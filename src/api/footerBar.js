import request from "@/utils/request";

export function getFooterBar(data) {
  return request({
    url: "/footer-bar/detail",
    method: "get",
    params: data,
  });
}

export function footerBarUpdate(data) {
  return request({
    url: "/footer-bar/update",
    method: "post",
    data,
  });
}
