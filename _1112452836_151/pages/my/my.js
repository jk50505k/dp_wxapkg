var e = require("../../npm/@dp/sparrow/index.js"), n = require("../../npm/@dp/owl-wxapp/es6/index.js"), o = require("../../npm/@mtfe/dynamic/config"), a = require("../../npm/@dp/logan-wxapp/build/wxlogan.js"), r = require("../../common/tabbar"), t = {
    pageBid: "c_a6tjluug"
}, i = {
    data: {
        exceptionDetail: {
            iconType: 1
        },
        dynamicComponentError: !1
    },
    onLoad: function(e) {
        a.log("=======my page onload======="), this.setData({
            info: JSON.stringify({
                loadOptions: Object.assign({}, e)
            })
        }), r(this.route);
    },
    onShow: function() {
        e.lxmina.pageView(t.pageBid), a.config({
            enableShake: !0,
            appSource: "dianping-wxapp"
        }), e.event.trigger("dp_my_show");
    },
    onHide: function() {
        a.config({
            enableShake: !1
        }), console.log("Logan ==> 上报关闭");
    },
    onUnload: function() {
        a.config({
            enableShake: !1
        }), console.log("Logan ==> 上报关闭");
    },
    onPullDownRefresh: function() {
        this.data.dynamicComponentError && this.reload(), wx.stopPullDownRefresh();
    },
    reload: function() {
        console.log("reload component!"), this.selectComponent("#tab-my-index").$reload(), 
        this.setData({
            dynamicComponentError: !1
        });
    },
    dynamicComponentError: function(e) {
        var n = e.detail, a = function(e, n) {
            return console.log(e, n);
        };
        switch (n.type) {
          case o.ErrorTypes.callback:
            return a("事件回调错误", n);

          case o.ErrorTypes.context:
            return a("context传递错误", n);

          case o.ErrorTypes.evaldata:
            return a("执行初始 js 错误", n);

          case o.ErrorTypes.request:
            return this.setData({
                dynamicComponentError: !0
            }), a("配置拉取错误", n);
        }
    },
    onException: function() {
        this.reload();
    }
};

(0, n.page)((0, e.pageBase)(i));