Component({
    properties: {
        exceptionDetail: {
            type: Object,
            observer: "_exceptionDetailChange"
        }
    },
    data: {
        exceptionInfo: {
            1: {
                description: "哎呀，你的网络好像出问题了",
                handlerText: "点击重新加载"
            },
            2: {
                description: "哎呀，页面加载失败了",
                handlerText: "点击重新加载"
            },
            3: {
                description: "暂无数据",
                handlerText: ""
            },
            4: {
                description: "您还没有任何订单哟~",
                handlerText: ""
            },
            5: {
                description: "还没有评论哟~",
                handlerText: ""
            },
            6: {
                description: "您还没有收藏过店铺哟~",
                handlerText: ""
            },
            7: {
                description: "您还没有优惠券哟~",
                handlerText: ""
            },
            8: {
                description: "获取地理位置失败",
                handlerText: "点击重新获取"
            },
            9: {
                description: "页面出错啦~",
                handlerText: ""
            },
            10: {
                description: "暂无可领用的优惠券",
                handlerText: ""
            }
        },
        show: !0
    },
    methods: {
        onTap: function() {
            console.log("trigger onTap exception"), this.triggerEvent("exceptionevent");
        },
        _exceptionDetailChange: function(e) {
            this.setData({
                show: e && Object.keys(e).length
            });
        }
    }
});