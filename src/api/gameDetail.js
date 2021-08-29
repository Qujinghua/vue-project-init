import request from "@/utils/request";

export function getGameDetail(data) {
  return request({
    url: "/game-detail/detail",
    method: "get",
    params: data,
  });
}

export function gameDetailImg(data) {
  return request({
    url: "/game-detail/editor-img",
    method: "post",
    data,
  });
}

export function gameDetailUpdate(data) {
  return request({
    url: "/game-detail/update",
    method: "post",
    data,
  });
}
