let mockData = {
    "name": "流程B",
    "nodeList": [
        {
            "id": "dj0491s0i",
            "name": "开始",
            "type": "start",
            "nodeType": "start",
            "left": "40px",
            "top": "351px",
            "ico": "el-icon-help",
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
            "id": "6361tk7b8r",
            "childDataSourceId": "21",
            "trueId": "31",
            "name": "基础模型1",
            "type": "basicModel",
            "nodeType": "basicModel",
            "left": "190px",
            "top": "331px",
            "ico": "el-icon-shopping-cart-full",
            "attr": {
                "algorithmParam": {
                    "jobName": "",
                    "launcherHost": "",
                    "jobId": "",
                    "ruleId": "",
                    "dataGovernanceHost": "",
                    "dataServerSeconds": ""
                },
                "environmentVariable": {
                    "type": "Java",
                    "num-executors": "",
                    "SPARK_HOME": "",
                    "executor-memory": "",
                    "executor-cores": ""
                }
            }
        },
        {
            "id": "kbr8xj7oco",
            "trueId": "21",
            "name": "数据源1",
            "type": "dataSource",
            "nodeType": "dataSource",
            "left": "190px",
            "top": "467px",
            "ico": "el-icon-coin"
        },
        {
            "id": "ikv9w8gsv",
            "childDataSourceId": "22",
            "trueId": "32",
            "name": "基础模型2",
            "type": "basicModel",
            "nodeType": "basicModel",
            "left": "634px",
            "top": "148px",
            "ico": "el-icon-shopping-cart-full",
            "attr": {
                "algorithmParam": {
                    "jobName": "",
                    "launcherHost": "",
                    "jobId": "",
                    "ruleId": "",
                    "dataGovernanceHost": "",
                    "dataServerSeconds": ""
                },
                "environmentVariable": {
                    "type": "Python",
                    "num-executors": "",
                    "SPARK_HOME": "",
                    "executor-memory": "",
                    "executor-cores": ""
                }
            }
        },
        {
            "id": "mpizniis5",
            "trueId": "22",
            "name": "数据源2",
            "type": "dataSource",
            "nodeType": "dataSource",
            "left": "634px",
            "top": "268px",
            "ico": "el-icon-coin"
        },
        {
            "id": "3d978el4ff",
            "childDataSourceId": "23",
            "trueId": "33",
            "name": "基础模型3",
            "type": "basicModel",
            "nodeType": "basicModel",
            "left": "635px",
            "top": "487px",
            "ico": "el-icon-shopping-cart-full",
            "attr": {
                "algorithmParam": {
                    "jobName": "",
                    "launcherHost": "",
                    "jobId": "",
                    "ruleId": "",
                    "dataGovernanceHost": "",
                    "dataServerSeconds": ""
                },
                "environmentVariable": {
                    "type": "Spark",
                    "num-executors": "",
                    "SPARK_HOME": "",
                    "executor-memory": "",
                    "executor-cores": ""
                }
            }
        },
        {
            "id": "gayfoldq74",
            "trueId": "23",
            "name": "数据源3",
            "type": "dataSource",
            "nodeType": "dataSource",
            "left": "635px",
            "top": "619px",
            "ico": "el-icon-coin"
        }
    ],
    "lineList": [
        {
            "from": "kbr8xj7oco",
            "to": "6361tk7b8r"
        },
        {
            "from": "dj0491s0i",
            "to": "6361tk7b8r"
        },
        {
            "from": "6361tk7b8r",
            "to": "vgu0l64nkj"
        },
        {
            "from": "mpizniis5",
            "to": "ikv9w8gsv"
        },
        {
            "from": "vgu0l64nkj",
            "to": "ikv9w8gsv",
            "label": "成功"
        },
        {
            "from": "ikv9w8gsv",
            "to": "3c4qqmcjvs"
        },
        {
            "from": "gayfoldq74",
            "to": "3d978el4ff"
        },
        {
            "from": "vgu0l64nkj",
            "to": "3d978el4ff",
            "label": "失败"
        },
        {
            "from": "3d978el4ff",
            "to": "3c4qqmcjvs"
        }
    ]
}

export default mockData
