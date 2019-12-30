var e = require("../../utils/npm/lx-analytics"), a = require("../../public/logan"), o = void 0, n = {
    pageBid: "c_5mi6vsao"
};

Page({
    data: {},
    onLoad: function(i) {
        o = getApp();
        var t = this;
        console.log("=======pay Page onLoad ========"), console.log("onload options:", i);
        var c = i.redirectUrl, l = i.failRedirectUrl, r = i.successType, s = i.failType, g = this.checkPayParams(i);
        i.package = decodeURIComponent(i.package), console.log("pay options:", i), a.log("pay page: " + JSON.stringify(i));
        var d = o.getLxData();
        if (e.pageView(n.pageBid, d), g) {
            t.loading();
            try {
                wx.requestPayment({
                    timeStamp: i.timeStamp,
                    nonceStr: i.nonceStr,
                    package: i.package,
                    signType: i.signType,
                    paySign: i.paySign,
                    success: function(e) {
                        t.hideLoading(), console.log("微信支付成功", e), c ? t.dealRedict(r, c) : wx.navigateBack({
                            delta: 1
                        });
                    },
                    fail: function(e) {
                        console.log("pay fail res: ", e), a.log("pay fail res: " + JSON.stringify(e)), e && "requestPayment:fail cancel" == e.errMsg ? t.dealRedict(s, l) : (wx.showToast({
                            icon: "none",
                            title: "支付失败请重试",
                            duration: 1e3
                        }), t.dealRedict(s, l));
                    },
                    complete: function(e) {
                        console.log("pay complete res: ", e), a.log("pay complete res: " + JSON.stringify(e)), 
                        e && "requestPayment:cancel" == e.errMsg && t.dealRedict(s, l);
                    }
                });
            } catch (e) {
                throw e;
            }
        } else console.log("微信支付参数有误options", i);
    },
    dealRedict: function(e, a) {
        a ? "mina" === e ? wx.redirectTo({
            url: decodeURIComponent(a)
        }) : wx.redirectTo({
            url: "/pages/webview/webview?url=" + a
        }) : wx.navigateBack({
            delta: 1
        });
    },
    checkPayParams: function(e) {
        return ![ "timeStamp", "nonceStr", "package", "signType", "paySign" ].some(function(a) {
            return !e[a] || "undefined" == e[a];
        });
    },
    onShow: function() {},
    onHide: function() {},
    loading: function() {
        wx.showToast({
            title: "支付中...",
            icon: "loading",
            duration: 5e3
        });
    },
    hideLoading: function() {
        wx.hideToast();
    }
});