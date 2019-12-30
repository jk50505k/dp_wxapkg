var t = {
    1: "primary",
    2: "disabled"
};

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        viewType: {
            type: Number
        },
        content: {
            type: Object
        },
        canLaunchApp: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        labelColorMap: t,
        defaultShopPic: "http://p1.meituan.net/scarlett/822cc67210869c3203025dc1ff91cf7c1982.png"
    },
    ready: function() {},
    methods: {
        onTapContent: function(t) {
            this.isShopException() || this.triggerEvent("tapConent", t);
        },
        isShopException: function() {
            var t = this.data.content, n = t.simpleLabel, e = t.itemLabel;
            return !!(n && n.status || e && "2" === e.picColor) && (wx.showToast({
                title: "商家暂时无法访问",
                icon: "none"
            }), !0);
        },
        onTapPicture: function(t) {
            this.isShopException() || this.triggerEvent("tapPicture", t);
        },
        onTapButton: function(t) {
            this.triggerEvent("tapButton", t);
        },
        onTapAdditional: function(t) {
            this.triggerEvent("tapAdditional", t);
        },
        onTapCurrentBar: function(t) {
            this.triggerEvent("tapCurrentBar", t);
        },
        launchAppError: function(t) {
            console.log("模块唤起app失败:" + JSON.stringify(t)), this.onTapContent(t);
        },
        launchAppTap: function() {
            console.log("模块唤起点击"), this.triggerEvent("launchtap");
        }
    }
});