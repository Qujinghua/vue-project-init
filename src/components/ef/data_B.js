let dataB = {
    "name": "流程B",
    "nodeList": [
        {
            "id": "dj0491s0i",
            "name": "开始",
            "type": "start",
            "nodeType": "start",
            "left": "16px",
            "top": "270px",
            "ico": "el-icon-help",
            "state": "success"
        },
        {
            "id": "8tzf6lvuvd",
            "name": "数据源1",
            "type": "dataSource",
            "nodeType": "dataSource",
            "left": "132px",
            "top": "270px",
            "ico": "el-icon-tickets",
            "state": "success"
        },
        {
            "id": "oyt3yc1o0q",
            "name": "基础模型1",
            "type": "basicModel",
            "nodeType": "basicModel",
            "left": "291px",
            "top": "260px",
            "ico": "el-icon-shopping-cart-full",
            "state": "success"
        },
        {
            "id": "vgu0l64nkj",
            "name": "判定",
            "type": "judge",
            "nodeType": "judge",
            "left": "468px",
            "top": "270px",
            "ico": "el-icon-time",
            "state": "success"
        },
        {
            "id": "9im9g5tous",
            "name": "基础模型11",
            "type": "basicModel",
            "nodeType": "basicModel",
            "left": "659px",
            "top": "117px",
            "ico": "el-icon-shopping-cart-full",
            "state": "success"
        },
        {
            "id": "hzay445v7a",
            "name": "基础模型12",
            "type": "basicModel",
            "nodeType": "basicModel",
            "left": "656px",
            "top": "398px",
            "ico": "el-icon-shopping-cart-full",
            "state": "success"
        },
        {
            "id": "3c4qqmcjvs",
            "name": "结束",
            "type": "end",
            "nodeType": "end",
            "left": "898px",
            "top": "267px",
            "ico": "el-icon-c-scale-to-original",
            "state": "success"
        }
    ],
    "lineList": [
        {
            "from": "dj0491s0i",
            "to": "8tzf6lvuvd"
        },
        {
            "from": "8tzf6lvuvd",
            "to": "oyt3yc1o0q"
        },
        {
            "from": "oyt3yc1o0q",
            "to": "vgu0l64nkj"
        },
        {
            "from": "vgu0l64nkj",
            "to": "9im9g5tous",
            "label": "YES"
        },
        {
            "from": "vgu0l64nkj",
            "to": "hzay445v7a",
            "label": "NO"
        },
        {
            "from": "hzay445v7a",
            "to": "3c4qqmcjvs"
        },
        {
            "from": "9im9g5tous",
            "to": "3c4qqmcjvs"
        }
    ]
}

export function getDataB() {
    return dataB
}
