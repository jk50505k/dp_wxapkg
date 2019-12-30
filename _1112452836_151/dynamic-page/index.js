var e = require("../npm/@mtfe/dynamic/config");

Page({
    data: {
        exceptionDetail: {
            iconType: 1
        },
        isError: !1
    },
    onLoad: function(e) {
        this.options = e, this.setData({
            case: e.scene
        }), e.title && wx.setNavigationBarTitle({
            title: e.title
        });
    },
    onShareAppMessage: function() {},
    onPageScroll: function() {},
    onPullDownRefresh: function() {
        this.data.isError && this.reload(), wx.stopPullDownRefresh();
    },
    reload: function() {
        this.selectComponent("#" + this.data.case).$reload(), this.setData({
            isError: !1
        });
    },
    dynamicComponentError: function(t) {
        var o = t.detail, r = function(e, t) {
            return console.log(e, t);
        };
        switch (o.type) {
          case e.ErrorTypes.callback:
            return r("事件回调错误", o);

          case e.ErrorTypes.context:
            return r("context传递错误", o);

          case e.ErrorTypes.evaldata:
            return r("执行初始 js 错误", o);

          case e.ErrorTypes.request:
            return this.setData({
                isError: !0
            }), r("配置拉取错误", o);
        }
    },
    onExceptionEvent: function() {
        console.log("onExceptionEvent"), this.reload();
    }
});