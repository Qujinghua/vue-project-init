let mockData = {
    "name": "流程B",
    "nodeList": [
        {
            "id": "dj0491s0i",
            "name": "开始",
            "type": "start",
            "nodeType": "start",
            "left": "44px",
            "top": "341px",
            "ico": "el-icon-help",
            "state": "success"
        },
        {
            "id": "oyt3yc1o0q",
            "name": "基础模型1",
            "type": "basicModel",
            "nodeType": "basicModel",
            "left": "203px",
            "top": "331px",
            "ico": "el-icon-shopping-cart-full",
            "state": "success"
        },
        {
            "id": "vgu0l64nkj",
            "name": "判定",
            "type": "judge",
            "nodeType": "judge",
            "left": "402px",
            "top": "341px",
            "ico": "el-icon-time",
            "state": "success"
        },
        {
            "id": "3c4qqmcjvs",
            "name": "结束",
            "type": "end",
            "nodeType": "end",
            "left": "872px",
            "top": "339px",
            "ico": "el-icon-c-scale-to-original",
            "state": "success"
        },
        {
            "id": "yi2w916kgf",
            "name": "数据源1",
            "type": "dataSource",
            "nodeType": "dataSource",
            "left": "203px",
            "top": "498px",
            "ico": "el-icon-coin",
            "state": "success"
        },
        {
            "id": "8unponwutg",
            "name": "数据源2",
            "type": "dataSource",
            "nodeType": "dataSource",
            "left": "640px",
            "top": "50px",
            "ico": "el-icon-coin",
            "state": "success"
        },
        {
            "id": "lc4k558dhb",
            "name": "基础模型2",
            "type": "basicModel",
            "nodeType": "basicModel",
            "left": "640px",
            "top": "195px",
            "ico": "el-icon-shopping-cart-full",
            "state": "success"
        },
        {
            "id": "vkapulqs6e",
            "name": "基础模型3",
            "type": "basicModel",
            "nodeType": "basicModel",
            "left": "641px",
            "top": "457px",
            "ico": "el-icon-shopping-cart-full",
            "state": "success"
        },
        {
            "id": "v42eqwj3j",
            "name": "数据源3",
            "type": "dataSource",
            "nodeType": "dataSource",
            "left": "641px",
            "top": "612px",
            "ico": "el-icon-coin",
            "state": "success"
        }
    ],
    "lineList": [
        {
            "from": "oyt3yc1o0q",
            "to": "vgu0l64nkj"
        },
        {
            "from": "dj0491s0i",
            "to": "oyt3yc1o0q"
        },
        {
            "from": "yi2w916kgf",
            "to": "oyt3yc1o0q"
        },
        {
            "from": "vgu0l64nkj",
            "to": "lc4k558dhb",
            "label": "成功"
        },
        {
            "from": "lc4k558dhb",
            "to": "3c4qqmcjvs"
        },
        {
            "from": "vgu0l64nkj",
            "to": "vkapulqs6e",
            "label": "失败"
        },
        {
            "from": "vkapulqs6e",
            "to": "3c4qqmcjvs"
        },
        {
            "from": "8unponwutg",
            "to": "lc4k558dhb"
        },
        {
            "from": "v42eqwj3j",
            "to": "vkapulqs6e"
        }
    ]
}

export default mockData
