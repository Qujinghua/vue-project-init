import request from "@/utils/request";

export function getGameList(data) {
  return request({
    url: "/game-classify/list",
    method: "get",
    params: data,
  });
}

export function gameClassifyAdd(data) {
  return request({
    url: "/game-classify/add",
    method: "post",
    data,
  });
}

export function gameClassifyUpdate(data) {
  return request({
    url: "/game-classify/update",
    method: "post",
    data,
  });
}

export function gameDel(data) {
  return request({
    url: "/game-classify/del",
    method: "post",
    data,
  });
}
